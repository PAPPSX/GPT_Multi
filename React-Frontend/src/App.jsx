import React, { useState } from "react";
import { Sidebar } from "./Components/Sidebar";
import ChatPage from "./Components/ChatPage";
import { ThemeProvider } from "./Components/ThemeProvider";
import { NavBar } from "./Components/NavBar";
import { Button } from "./Components/ui/Button";
import { Menu } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import NewChat from "./Components/NewChat";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <MainLayout />
      </Router>
    </ThemeProvider>
  );
}

const isAuthenticated = !!localStorage.getItem("auth-token");

function MainLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // For login/register routes, show a full-screen centered form
  if (location.pathname === "/login" || location.pathname === "/register") {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        {location.pathname === "/login" ? <Login /> : <Register />}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow">
        <div className="p-4 flex justify-between items-center border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden z-40"
          >
            <Menu className="h-6 w-6 dark:text-white text-black" />
          </Button>
          <NavBar />
        </div>

        <Routes>
          {isAuthenticated ? (
            <>
              {/* Redirect root to a default chat */}
              <Route
                path="/"
                element={<Navigate to="/chat/default_chat" replace />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
              <Route path="/new-chat" element={<NewChat />} />
              <Route
                path="*"
                element={<Navigate to="/chat/default_chat" replace />}
              />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
