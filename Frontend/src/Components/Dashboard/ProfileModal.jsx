import React, { useState } from "react";
import { FaUserCircle, FaTimes, FaSave } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose, user, updateProfile }) => {
  const [profileData, setProfileData] = useState({ name: user?.name || "", email: user?.email || "", password: "" });
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating...");
    const result = await updateProfile(profileData);
    if (result.success) {
      setMessage("Updated successfully!");
      setTimeout(onClose, 1500);
    } else {
      setMessage(" Error: " + result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <FaUserCircle className="text-blue-600" /> Edit Profile
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <FaTimes size={16}/>
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className={`mb-6 text-sm font-semibold text-center p-3 rounded-lg ${message.includes("Error") ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 pl-1">
              Full Name
            </label>
            <input 
              type="text" 
              value={profileData.name} 
              onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-white transition-all" 
              required 
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 pl-1">
              Email Address
            </label>
            <input 
              type="email" 
              value={profileData.email} 
              onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-white transition-all" 
              required 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 pl-1">
              New Password <span className="font-normal text-gray-400 lowercase tracking-normal">(Optional)</span>
            </label>
            <input 
              type="password" 
              placeholder="Leave blank to keep current" 
              value={profileData.password} 
              onChange={(e) => setProfileData({...profileData, password: e.target.value})} 
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-white transition-all" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg mt-4 active:scale-95"
          >
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;