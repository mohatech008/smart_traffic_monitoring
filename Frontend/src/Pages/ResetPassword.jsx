import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) return setMessage("Passwords do not match!!");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(" " + data.message);
      }
    } catch (error) {
      setMessage(" Error resetting password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">New Password</h2>
        {message && <p className="text-center p-2 mb-4 rounded bg-gray-100 text-gray-700">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="New Password" className="w-full p-3 border rounded-lg" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;