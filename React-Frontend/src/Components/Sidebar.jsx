import { ScrollArea } from "./ui/scroll-area";
import { ChevronRight, Plus, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

export function Sidebar({ isOpen, toggleSidebar }) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { t } = useTranslation();
  const navigate = useNavigate(); // For dynamic navigation

  // Dynamic Chat History Data
  const chatHistory = [
    { section: "previous_30_days", chats: ["video_link_inquiry"] },
    {
      section: "year_2024",
      chats: [
        "math_gesture_ai_project",
        "bellman_ford_shortest_paths",
        "environmental_pollution_mcq",
        "ocr_exam_help",
        "custom_authentication_system",
        "email_data_extraction",
        "email_processing_script",
        "platformer_game_overview",
      ],
    },
  ];

  return (
    <div>
      <div
        className={`fixed lg:relative ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-72 lg:w-80 h-full transition-transform duration-300 ease-in-out z-50 ${
          currentTheme === "dark"
            ? "bg-gray-800 text-white shadow-gray-800/50"
            : "bg-white text-black shadow-gray-300/50"
        } shadow-lg border-r border-gray-300`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4 mt-1 lg:mt-3">
            <span className="text-lg font-semibold">
              <Link to="/">MULTIGPT</Link>
            </span>
            <button
              className="p-2 rounded-md flex items-center hover:bg-blue-700 lg:hidden bg-blue-600 text-white"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat History Title */}
          <h2 className="text-sm font-semibold mb-2">{t("chatHistory")}</h2>

          {/* New Chat Button */}
          <button
            className="w-full flex items-center justify-between text-left text-sm px-3 py-2 mb-4 rounded-md text-black dark:text-white hover:bg-blue-700 transition hover:text-white"
            onClick={() => navigate("/new-chat")}
          >
            {t("newChat")}
            <Plus className="h-4 w-4" />
          </button>

          {/* Scrollable Chat History */}
          <ScrollArea className="flex-1">
            {chatHistory.map((group, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-xs font-semibold mb-2 text-gray-600">
                  {t(group.section)}
                </h2>
                <div className="space-y-1">
                  {group.chats.map((chat, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/chat/${chat}`)} // Dynamic Navigation
                      className="w-full flex items-center justify-between text-left text-sm px-3 py-2 rounded-md transition hover:bg-blue-700 hover:text-white"
                    >
                      {t(chat)}
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
