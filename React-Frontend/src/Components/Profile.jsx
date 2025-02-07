import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile after login
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/auth/profile", {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

//   const handleLogout = async () => {
//     await fetch("http://localhost:8000/api/v1/user/auth/logout", {
//       method: "POST",
//       credentials: "include", // ✅ Ensures cookies are included in logout
//     });

//     navigate("/login");
//   };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96 text-center">
        {user && (
          <>
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </>
        )}
        {/* <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-500 hover:bg-red-600 rounded w-full"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Profile;
