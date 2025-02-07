import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatArea from "./ChatArea";
import InputArea from "./InputArea";

export default function ChatPage() {
  const { chatId } = useParams();
  const chatTitle = chatId.replace(/_/g, " "); // Convert slug to readable title

  // Chat state for messages
  const [messages, setMessages] = useState([]);

  // sendMessage calls your FastAPI endpoint and updates state
  const sendMessage = async (userMessage, files) => {
    if (!userMessage.trim() && files.length === 0) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      content: userMessage,
    };

    // Optimistically add the user's message
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("http://localhost:9001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 1, // You can use chatId if needed
          user_id: 1,
          input: userMessage,
        }),
      });

      const data = await response.json();
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        content: data.response,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add error handling (e.g., show an error message in the chat)
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-black rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {chatTitle}
        </h1>
        <Button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg shadow-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
          New Chat
        </Button>
      </div>

      {/* Chat display area */}
      <ChatArea messages={messages} />

      {/* Input area; note the sendMessage prop is passed */}
      <InputArea sendMessage={sendMessage} />
    </div>
  );
}
