"use client";
import { InboxSidebar } from "@/components/main/InboxSidebar";
import { ChatView } from "@/components/main/ChatView";
import { Suspense } from "react";

export default function InboxPage() {
  return (
    <div className="flex">
      <Suspense fallback={<div className="p-4">Loading sidebar...</div>}>
        <InboxSidebar />
      </Suspense>

      <div className="flex-1">
        <Suspense fallback={<div className="p-4">Loading chat...</div>}>
          <ChatView />
        </Suspense>
      </div>
    </div>
  );
}
