import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const dummyChats = [
  { id: 1, title: "📚 Learn About AI" },
  { id: 2, title: "🛠 How to Use React Hooks?" },
  { id: 3, title: "💡 Startup Business Ideas" },
  { id: 4, title: "🌐 Latest Web Trends 2024" },
  { id: 5, title: "📊 Best Investment Strategies" },
];

export default function NewChat() {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="flex flex-col h-full p-8   rounded-xl shadow-xl">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Start a New Chat
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
          Select a conversation starter or type a custom message below.
        </p>
      </div>

      {/* Dummy Chat Suggestions */}
      <ScrollArea className="mt-6 max-h-[250px] overflow-auto pb-4 space-y-4">
        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{chat.title}</h2>
          </div>
        ))}
      </ScrollArea>


    </div>
  );
}
