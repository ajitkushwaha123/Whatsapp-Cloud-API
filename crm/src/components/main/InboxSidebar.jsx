"use client";

import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function InboxSidebar() {
  const { data, isLoading } = useSWR("/api/inbox", fetcher);
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get("from");

  return (
    <ScrollArea className="h-screen w-72 border-r p-4">
      <h2 className="text-lg font-semibold mb-4">📥 WhatsApp Inboxes</h2>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      )}

      <div className="space-y-2">
        {data?.inbox?.map((chat) => (
          <Card
            key={chat._id}
            className={clsx(
              "p-3 cursor-pointer hover:bg-gray-100",
              selected === chat._id && "bg-gray-100"
            )}
            onClick={() => router.push(`/dashboard/inbox?from=${chat._id}`)}
          >
            <div className="font-semibold text-sm text-black truncate">
              {chat._id}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {chat.lastMessage || "No message"}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              {new Date(chat.lastTime).toLocaleTimeString()}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
