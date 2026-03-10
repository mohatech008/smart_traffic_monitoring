import React from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";

const TopBar = ({ setIsSidebarOpen, activeTab, user, dark, toggleTheme }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow md:hidden text-gray-700 dark:text-white">
          <FaBars />
        </button>
        <div>
          <h1 className="text-xl md:text-3xl font-bold capitalize">{activeTab} View</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            Welcome back, <span className="text-blue-600 font-semibold">{user?.name ? user.name.split(' ')[0] : "User"}</span>
          </p>
        </div>
      </div>
      <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-white transition hover:scale-110">
        {dark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
      </button>
    </div>
  );
};

export default TopBar;