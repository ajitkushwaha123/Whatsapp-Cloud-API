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

  if (!from) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Select a chat to view messages
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen p-6 flex flex-col gap-2 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Chat with {from}</h2>

      {isLoading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : data?.messages?.length ? (
        data.messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-3 rounded-lg max-w-[70%] break-words ${
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
      ) : (
        <p className="text-sm text-gray-400">No messages found</p>
      )}
    </ScrollArea>
  );
}
