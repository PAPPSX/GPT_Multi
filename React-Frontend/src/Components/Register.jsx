import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    try {
      const response = await fetch("http://localhost:8000/api/v1/user/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, profilePic }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
  
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full p-2 mb-3 bg-gray-700 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 mb-3 bg-gray-700 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 mb-3 bg-gray-700 rounded"
          />
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Profile Pic URL"
            required
            className="w-full p-2 mb-3 bg-gray-700 rounded"
          />
          <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded">
            Sign Up
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-3 text-sm text-gray-300 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
