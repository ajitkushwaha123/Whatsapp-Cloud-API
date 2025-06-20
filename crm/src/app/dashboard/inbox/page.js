"use client";

import { ChatView } from "@/components/main/ChatView";
import { InboxSidebar } from "@/components/main/InboxSidebar";

export default function InboxPage() {
  return (
    <div className="flex">
      <InboxSidebar />
      <div className="flex-1">
        <ChatView />
      </div>
    </div>
  );
}
