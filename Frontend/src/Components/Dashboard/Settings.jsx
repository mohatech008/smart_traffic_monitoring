import React from "react";
import { FaCogs, FaUsers, FaShieldAlt, FaTrash, FaMoon, FaSun } from "react-icons/fa";

const Settings = ({ dark, toggleTheme, fetchUsers, handleClearDB }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      
      {/* --- PAGE HEADER --- */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FaCogs className="text-blue-600" /> Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your system preferences and administrative controls.
        </p>
      </div>

      {/* --- 1. APPEARANCE CARD --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
          Appearance
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Dark Mode</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark visual themes.</p>
          </div>
          
          {/* Toggle Switch */}
          <button 
            onClick={toggleTheme} 
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${dark ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs text-gray-500 ${dark ? 'translate-x-6' : ''}`}>
               {dark ? <FaMoon size={10} className="text-blue-600"/> : <FaSun size={10} className="text-yellow-500"/>}
            </div>
          </button>
        </div>
      </div>

      {/* --- 2. ACCESS CONTROL CARD --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
          Access Control
        </h3>

        {/* User Management */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">User Management</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add, remove, or audit traffic officer accounts.</p>
          </div>
          <button 
            onClick={fetchUsers} 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md flex items-center gap-2"
          >
            <FaUsers /> Manage Officers
          </button>
        </div>
      </div>

      {/* --- 3. DANGER ZONE CARD --- */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl shadow-sm border border-red-200 dark:border-red-900 p-6 transition-all duration-300">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 border-b border-red-200 dark:border-red-800 pb-2 flex items-center gap-2">
          <FaShieldAlt /> Danger Zone
        </h3>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-semibold text-red-800 dark:text-red-300">Clear System Data</h4>
            <p className="text-sm text-red-600 dark:text-red-400 opacity-80">
              Permanently delete all traffic logs and incident history. This action cannot be undone.
            </p>
          </div>
          <button 
            onClick={handleClearDB} 
            className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-md flex items-center gap-2"
          >
            <FaTrash /> Clear Database
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;