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
      setMessage("Error: " + result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><FaUserCircle className="text-blue-600" /> Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500"><FaTimes size={20}/></button>
        </div>
        {message && <p className="mb-4 text-sm font-semibold text-center p-2 rounded bg-blue-100 text-blue-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
          <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
          <input type="password" placeholder="New Password (Optional)" value={profileData.password} onChange={(e) => setProfileData({...profileData, password: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 flex items-center justify-center gap-2"><FaSave /> Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;