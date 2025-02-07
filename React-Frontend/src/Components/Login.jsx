import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear existing errors

    try {
        const response = await fetch("http://localhost:8000/api/v1/user/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // ✅ Ensures cookies are sent and received
        });

        const data = await response.json();
localStorage.setItem('auth-token',data.token);
        if (!data.success) {
            setError(data.message);
        } else {
            navigate("/profile"); // Redirect to profile after login
        }
    } catch (err) {
        setError("Something went wrong, please try again.");
    }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
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
          <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded">
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 text-sm text-gray-300 hover:underline"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
