import React from "react";
import { FaTachometerAlt, FaBell, FaCar, FaCogs, FaUserCircle, FaSignOutAlt, FaEdit, FaShieldAlt, FaTimes } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, user, logout, isAdmin, onProfileClick }) => {
  const menuItems = [
    { id: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { id: 'alerts', icon: FaBell, label: 'Alerts' },
    { id: 'cameras', icon: FaCar, label: 'Cameras' },
  ];

  if (isAdmin) {
    menuItems.push({ id: 'settings', icon: FaCogs, label: 'Settings' });
  }

  return (
    <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-xl`}>
      <div className="text-2xl font-bold p-6 border-b border-gray-700 flex justify-between items-center">
        <span>FlowSense</span>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white"><FaTimes /></button>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (

<li 
  key={item.id} 
  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} 
  className={`group py-3 flex items-center gap-3 rounded-lg px-4 cursor-pointer transition-all duration-200 ${
    activeTab === item.id 
      ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-500 rounded-l-none' 
      : 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
  }`}
>
  <item.icon className={`${activeTab === item.id ? 'text-blue-400' : 'group-hover:text-white'}`} /> 
  <span className="font-medium text-sm">{item.label}</span>
</li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-700">
        <div onClick={onProfileClick} className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition group" title="Click to Edit Profile">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-md relative">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle size={24} />}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold truncate">{user?.name || "Guest User"}</p>
              <FaEdit className="text-gray-400 opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
            </div>
            <div className="text-xs">
              {isAdmin ? <span className="text-red-400 font-bold flex items-center gap-1"><FaShieldAlt size={10} /> ADMIN</span> : <span className="text-gray-400">Traffic Controller</span>}
            </div>
          </div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm w-full font-medium transition hover:translate-x-1"><FaSignOutAlt /> Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;