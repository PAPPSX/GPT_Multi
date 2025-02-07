// import React, { useState } from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "./ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { useTranslation } from "react-i18next";
// import { Link, useNavigate } from "react-router-dom"; // For navigation

// export function NavBar() {
//   const { theme, setTheme, resolvedTheme } = useTheme();
//   const { t, i18n } = useTranslation(); // Access t function and i18n object
//   const [lang, setLang] = useState(i18n.language); // Track language change
//   const navigate = useNavigate(); // For navigation

//   const effectiveTheme = theme === "system" ? resolvedTheme : theme;

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng).then(() => {
//       setLang(i18n.language); // Update the state after language change
//     });
//   };

//   // Check if the user is authenticated (you can change this logic based on your auth system)
//   const isAuthenticated = !!localStorage.getItem('auth-token'); // Use a more secure method in production

//   const handleLogout = () => {
//     // Clear the auth token (or handle your logout process)
//     localStorage.removeItem('auth-token');
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="flex justify-between items-center p-4 h-10 w-full">
//       {/* Logo at the very left end */}
//       <span
//         className={`text-lg font-semibold ${
//           effectiveTheme === "dark" ? "text-white" : "text-black"
//         }`}
//       >
//         <Link to="/">
//         MULTIGPT
//         </Link>
//       </span>

//       {/* Buttons for theme, language, and login/logout on the right */}
//       <div className="flex items-center space-x-6 ml-auto">
//         {/* Theme Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               size="icon"
//               aria-label="Toggle theme"
//               className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               <Sun
//                 className={`h-5 w-5 transition-transform duration-500 ${
//                   effectiveTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
//                 }`}
//               />
//               <Moon
//                 className={`absolute h-5 w-5 transition-transform duration-500 ${
//                   effectiveTheme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
//                 }`}
//               />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent
//             align="end"
//             className={`rounded-lg shadow-xl p-2 backdrop-blur-md transition-all duration-300 ${
//               effectiveTheme === "dark" ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-900"
//             }`}
//           >
//             <DropdownMenuItem
//               onClick={() => setTheme("light")}
//               className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
//                 theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
//               } hover:bg-gray-100 dark:hover:bg-gray-600`}
//             >
//               <Sun className="h-4 w-4" /> {t('theme.light')}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => setTheme("dark")}
//               className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
//                 theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
//               } hover:bg-gray-100 dark:hover:bg-gray-600`}
//             >
//               <Moon className="h-4 w-4" /> {t('theme.dark')}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => setTheme("system")}
//               className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
//             >
//               <span className="h-4 w-4">🖥️</span> {t('theme.system')}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Language Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               size="sm"
//               className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               {i18n.language.toUpperCase()}
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent
//             align="end"
//             className={`rounded-lg shadow-xl p-2 backdrop-blur-md transition-all duration-300 ${
//               effectiveTheme === "dark" ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-900"
//             }`}
//           >
//             <DropdownMenuItem
//               onClick={() => changeLanguage("en")}
//               className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
//                 i18n.language === "en" ? "bg-gray-200 dark:bg-gray-700" : ""
//               } hover:bg-gray-100 dark:hover:bg-gray-600`}
//             >
//               {t('language.en')}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => changeLanguage("mr")}
//               className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
//                 i18n.language === "mr" ? "bg-gray-200 dark:bg-gray-700" : ""
//               } hover:bg-gray-100 dark:hover:bg-gray-600`}
//             >
//               {t('language.mr')}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => changeLanguage("hi")}
//               className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
//                 i18n.language === "hi" ? "bg-gray-200 dark:bg-gray-700" : ""
//               } hover:bg-gray-100 dark:hover:bg-gray-600`}
//             >
//               {t('language.hi')}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Conditional Login/Logout Button */}
//         {isAuthenticated ? (
//           <Button
//             variant="outline"
//             size="sm"
//             className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             onClick={handleLogout}
//           >
//             {t('logout')}
//           </Button>
//         ) : (
//           <>
//             <Button
//               variant="outline"
//               size="sm"
//               className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               onClick={() => navigate("/login")}
//             >
//               {t('login')}
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               onClick={() => navigate("/register")}
//             >
//               {t('signup')}
//             </Button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"; // Import Popover components

export function NavBar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t, i18n } = useTranslation(); // Access t function and i18n object
  const [lang, setLang] = useState(i18n.language); // Track language change
  const [avatarOpen, setAvatarOpen] = useState(false); // Track avatar popover state
  const [user, setUser] = useState(null); // Track user data
  const navigate = useNavigate(); // For navigation

  const effectiveTheme = theme === "system" ? resolvedTheme : theme;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setLang(i18n.language); // Update the state after language change
    });
  };

  // Check if the user is authenticated (you can change this logic based on your auth system)
  const isAuthenticated = !!localStorage.getItem('auth-token'); // Use a more secure method in production

  const handleLogout = () => {
    // Clear the auth token (or handle your logout process)
    localStorage.removeItem('auth-token');
    setAvatarOpen(false); // Close avatar popover on logout
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // Fetch user profile after login (if authenticated)
    if (isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/v1/user/auth/profile", {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
          });

          const data = await response.json();
          if (data.success) {
            setUser(data.user);
          } else {
            navigate("/login"); // Redirect if not logged in
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          navigate("/login");
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-between items-center p-4 h-10 w-full">
      {/* Logo at the very left end */}
      <span
        className={`text-lg font-semibold ${
          effectiveTheme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <Link to="/">MULTIGPT</Link>
      </span>

      {/* Buttons for theme, language, and login/logout on the right */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Theme Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Sun
                className={`h-5 w-5 transition-transform duration-500 ${
                  effectiveTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`absolute h-5 w-5 transition-transform duration-500 ${
                  effectiveTheme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={`rounded-lg shadow-xl p-2 backdrop-blur-md transition-all duration-300 ${
              effectiveTheme === "dark" ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-900"
            }`}
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-600`}
            >
              <Sun className="h-4 w-4" /> {t('theme.light')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-600`}
            >
              <Moon className="h-4 w-4" /> {t('theme.dark')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <span className="h-4 w-4">🖥️</span> {t('theme.system')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 bg-gradient-to-br from-primary to-primary-foreground hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {i18n.language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={`rounded-lg shadow-xl p-2 backdrop-blur-md transition-all duration-300 ${
              effectiveTheme === "dark" ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-900"
            }`}
          >
            <DropdownMenuItem
              onClick={() => changeLanguage("en")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                i18n.language === "en" ? "bg-gray-200 dark:bg-gray-700" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-600`}
            >
              {t('language.en')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("mr")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                i18n.language === "mr" ? "bg-gray-200 dark:bg-gray-700" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-600`}
            >
              {t('language.mr')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("hi")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                i18n.language === "hi" ? "bg-gray-200 dark:bg-gray-700" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-600`}
            >
              {t('language.hi')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

   {/* Avatar and Profile Dropdown */}
{isAuthenticated && user && (
  <Popover open={avatarOpen} onOpenChange={setAvatarOpen}>
    <PopoverTrigger asChild>
    
        {/* Avatar */}
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-11 h-11 rounded-full border-4 border-primary shadow-md transition-all duration-300 hover:scale-105"
        />
    
    </PopoverTrigger>

    <PopoverContent className="w-60 p-4 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-xl border border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col items-center text-center">
        {/* User Avatar */}
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-4 border-primary shadow-md transition-all duration-300 hover:scale-105"
        />

        {/* User Info */}
        <span className="mt-2 text-lg font-semibold text-gray-900 text-black dark:text-black">
          {user.name}
        </span>
        <span className="text-sm text-black dark:text-gray-800">
          {user.email}
        </span>

        {/* Profile Actions */}
        <div className="mt-4 flex flex-col gap-2 w-full">
          <Button
            variant="outline"
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 transition-all duration-300"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </Button>

          <Button
            variant="outline"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-all duration-300"
            onClick={handleLogout}
          >
            {t("logout")}
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
)}

      </div>
    </div>
  );
}
