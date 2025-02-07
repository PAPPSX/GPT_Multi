import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatArea({ messages = [] }) {
  return (
    <ScrollArea className="flex-grow bg-background/50 rounded-lg shadow-inner p-4 overflow-auto pb-8">
      <div className="space-y-6 max-w-3xl mx-auto my-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mt-4 mb-4`}
          >
            <div
              className={`flex items-start space-x-3 max-w-[70%] ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <Avatar>
                <AvatarImage
                  src={
                    message.sender === "user"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKa3xRPNbZuH8TB4AIYKiIOCQ_aB_Tyy55A&s"
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-OFOuCpaMY8sQtRnnKRXKgSKXhDaEQQWJw&s"
                  }
                  alt={message.sender}
                />
                <AvatarFallback>
                  {message.sender === "user" ? "U" : "B"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`p-4 rounded-lg text-sm shadow-md dark:shadow-gray-800 shadow-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105
                  ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none dark:bg-gray-700 bg-gray-300"
                      : "bg-secondary text-secondary-foreground rounded-bl-none dark:bg-gray-500 bg-gray-100"
                  }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
