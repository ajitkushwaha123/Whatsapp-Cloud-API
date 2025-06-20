"use client";

import useSWR from "swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ChatView() {
  const params = useSearchParams();
  const from = params.get("from");

  const { data, isLoading } = useSWR(
    from ? `/api/messages?from=${from}` : null,
    fetcher
  );

  if (!from) return <div className="p-6">Select a chat</div>;

  return (
    <ScrollArea className="h-screen p-6 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4">Chat with {from}</h2>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        data?.messages?.map((msg) => (
          <div
            key={msg._id}
            className={`p-3 rounded-lg max-w-[60%] ${
              msg.direction === "incoming"
                ? "bg-gray-100 self-start"
                : "bg-green-100 self-end"
            }`}
          >
            <p>{msg.message}</p>
            <span className="text-xs text-gray-400 block mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))
      )}
    </ScrollArea>
  );
}
