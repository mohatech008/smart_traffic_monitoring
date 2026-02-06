import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import TrafficMap from "../Components/TrafficMap.jsx";
import { io } from "socket.io-client";
import {
  FaTachometerAlt, FaCar, FaBell, FaCogs, FaUserCircle, FaMoon, FaSun, FaSignOutAlt, 
  FaVideo, FaExclamationTriangle, FaBars, FaTimes
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import CountUp from "react-countup";

// Dummy Data for Traffic Flow 
const trafficFlowData = {
  Today: [
    { time: "6AM", vehicles: 120 }, { time: "7AM", vehicles: 300 },
    { time: "8AM", vehicles: 500 }, { time: "9AM", vehicles: 450 },
    { time: "10AM", vehicles: 600 }, { time: "11AM", vehicles: 400 },
  ],
  Week: [
    { time: "Mon", vehicles: 2000 }, { time: "Tue", vehicles: 2300 },
    { time: "Wed", vehicles: 2100 }, { time: "Thu", vehicles: 2500 },
    { time: "Fri", vehicles: 2700 }, { time: "Sat", vehicles: 1800 },
    { time: "Sun", vehicles: 1900 },
  ],
};

const Dashboard = () => {
  // --- HOOKS ---
  const { user, logout } = useContext(AuthContext);
  const [dark, setDark] = useState(false);
  
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  // Data State
  const [trafficFilter, setTrafficFilter] = useState("Today");
  const [incidents, setIncidents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    activeAlerts: 0,
    congestedRoads: 0
  });

  const toggleTheme = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // --- HELPER FUNCTIONS ---
  const processChartData = (incidentList) => {
    const roadCounts = {};
    incidentList.forEach((item) => {
      const roadName = item.location; 
      roadCounts[roadName] = (roadCounts[roadName] || 0) + 1;
    });
    const processedData = Object.keys(roadCounts).map((road) => ({
      road: road,
      congestion: roadCounts[road] * 10, 
    }));
    setChartData(processedData);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-500 font-bold';
      case 'medium': return 'text-orange-500 font-bold';
      case 'low': return 'text-green-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  // --- FETCH DATA & SOCKET ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/incidents");
        const data = await response.json();
        
        setIncidents(data);
        processChartData(data); 

        const congestionCount = data.filter(i => i.type === "congestion").length;
        setStats({
          activeAlerts: data.length,
          congestedRoads: congestionCount > 0 ? congestionCount : 0
        });

      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    };

    fetchData();

    const socket = io("http://localhost:5000");

    socket.on("newIncident", (newData) => {
      console.log("🔥 Socket Event Received:", newData);
      setIncidents((prev) => {
        const updatedList = [newData, ...prev];
        processChartData(updatedList); 
        return updatedList;
      });
      setStats((prevStats) => ({
        ...prevStats,
        activeAlerts: prevStats.activeAlerts + 1,
        congestedRoads: newData.type === 'congestion' ? prevStats.congestedRoads + 1 : prevStats.congestedRoads
      }));
      // --- PLAY SOUND EFFECT ---
      console.log("Checking severity:", newData.severity);
      if (newData.severity === 'high' || newData.severity === 'critical') {
        console.log("🔊 Attempting to play sound...");
        const audio = new Audio("/Sounds/alert.mp3"); 
        audio.play()
          .then(() => console.log("✅ Audio played successfully!"))
          .catch((error) => {
            console.error("❌ Audio Failed:", error); // LOG 4
          });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false); 
  };

  // --- RENDER UI ---
  return (
    <div className={`flex h-screen overflow-hidden ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-xl
      `}>
        <div className="text-2xl font-bold p-6 border-b border-gray-700 flex justify-between items-center">
          <span>FlowSense</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
              { id: 'alerts', icon: FaBell, label: 'Alerts' },
              { id: 'cameras', icon: FaCar, label: 'Cameras' },
              { id: 'settings', icon: FaCogs, label: 'Settings' }
            ].map((item) => (
              <li 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 flex items-center gap-3 rounded px-2 cursor-pointer transition ${activeTab === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              >
                <item.icon /> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* --- USER PROFILE SECTION --- */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle size={24} />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate" title={user?.name}>
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role || "Traffic Controller"}
              </p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm w-full font-medium transition hover:translate-x-1">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow md:hidden text-gray-700 dark:text-white"
            >
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

        {/* --- VIEW 1: DASHBOARD --- */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in">
            {/* Metrics Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {[
                { title: "Total Vehicles", value: 1234, unit: "", color: "gray" },
                { title: "Avg Speed", value: 45, unit: "km/h", color: "gray" },
                { title: "Congested Roads", value: stats.congestedRoads, unit: "", color: "yellow", textClass: "text-yellow-500" },
                { title: "Active Alerts", value: stats.activeAlerts, unit: "", color: "red", textClass: "text-red-500" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                  <h2 className="text-gray-500 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wide">{item.title}</h2>
                  <p className={`text-2xl font-bold ${item.textClass || "text-gray-800 dark:text-white"}`}>
                    <CountUp end={item.value} duration={2} /> <span className="text-sm font-normal">{item.unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* --- MAP & CHARTS SECTION (Updated) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
              
              {/* LEFT: TRAFFIC MAP */}
              <div className="h-full w-full">
                 <TrafficMap incidents={incidents} />
              </div>

              {/* RIGHT: CONGESTION CHART */}
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow h-80 lg:h-full">
                <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-lg mb-4">Congestion Levels</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="road" stroke="#9CA3AF" tick={{fontSize: 10}} />
                    <YAxis stroke="#9CA3AF" tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{ backgroundColor: dark ? '#1F2937' : '#fff', borderColor: '#374151' }} />
                    <Bar dataKey="congestion" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Table */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
               <div className="p-4 border-b dark:border-gray-700 font-bold text-sm md:text-base">Recent Activity Preview</div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left min-w-[500px]">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                      {incidents.slice(0, 3).map((alert) => (
                        <tr key={alert._id}>
                          <td className="p-4">{alert.location}</td>
                          <td className={`p-4 uppercase font-bold text-xs ${getSeverityColor(alert.severity)}`}>{alert.severity}</td>
                          <td className="p-4 text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: ALERTS --- */}
        {activeTab === "alerts" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-fade-in">
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Full Incident History</h3>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{stats.activeAlerts} Active Alerts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="p-4">Time</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Severity</th>
                    <th className="p-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                  {incidents.map((alert) => (
                    <tr key={alert._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="p-4 text-gray-600 dark:text-gray-300">
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4 font-medium text-gray-800 dark:text-white flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-500" /> {alert.location}
                      </td>
                      <td className="p-4 capitalize">{alert.type}</td>
                      <td className={`p-4 uppercase text-xs font-bold ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">
                        {alert.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW 3: CAMERAS --- */}
        {activeTab === "cameras" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {["Mombasa Road Cam 1", "Thika Superhighway Cam 4", "Waiyaki Way Cam 2", "Langata Road Cam 5"].map((cam, index) => (
              <div key={index} className="bg-black rounded-xl overflow-hidden shadow-lg relative group">
                <div className="h-48 md:h-64 bg-gray-900 flex items-center justify-center relative">
                   <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">● LIVE</div>
                   <FaVideo size={40} className="text-gray-700" />
                   <p className="absolute bottom-4 left-4 text-white font-bold bg-black/50 px-2 rounded text-xs md:text-sm">{cam}</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center">
                   <span className="text-xs md:text-sm font-semibold text-green-600">● Signal Online</span>
                   <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200">Full Screen</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW 4: SETTINGS --- */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow p-6 md:p-8 animate-fade-in">
            <h3 className="text-lg md:text-xl font-bold mb-6 border-b pb-4 dark:border-gray-700">System Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm md:text-base">Dark Mode</h4>
                  <p className="text-xs md:text-sm text-gray-500">Toggle system theme</p>
                </div>
                <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${dark ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${dark ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              
              <div className="pt-6 mt-6 border-t dark:border-gray-700">
                <h4 className="font-semibold text-red-500 mb-2 text-sm md:text-base">Account Actions</h4>
                <button onClick={logout} className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-xs md:text-sm">
                  Log Out Everywhere
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;