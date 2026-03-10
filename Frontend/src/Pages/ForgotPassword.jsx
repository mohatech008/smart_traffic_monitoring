import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage("Check your email for the reset link.");
      } else {
        // Fallback if data.message is missing
        setMessage("" + (data.message || data.error || "An error occurred"));
      }
      
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setMessage(" Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        
        {message && <p className={`text-center p-2 mb-4 rounded ${message.includes("Success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Enter your email</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:outline-blue-500" 
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-gray-500 hover:text-blue-600">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;