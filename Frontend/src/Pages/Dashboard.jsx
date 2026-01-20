import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // 1. Import AuthContext
import {
  FaTachometerAlt,
  FaCar,
  FaBell,
  FaCogs,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import CountUp from "react-countup";

// Keep dummy chart data for now (since we don't have a traffic flow API yet)
const trafficFlowData = {
  Today: [
    { time: "6AM", vehicles: 120 },
    { time: "7AM", vehicles: 300 },
    { time: "8AM", vehicles: 500 },
    { time: "9AM", vehicles: 450 },
    { time: "10AM", vehicles: 600 },
    { time: "11AM", vehicles: 400 },
  ],
  Week: [
    { time: "Mon", vehicles: 2000 },
    { time: "Tue", vehicles: 2300 },
    { time: "Wed", vehicles: 2100 },
    { time: "Thu", vehicles: 2500 },
    { time: "Fri", vehicles: 2700 },
    { time: "Sat", vehicles: 1800 },
    { time: "Sun", vehicles: 1900 },
  ],
};

const congestionData = [
  { road: "Ngong Rd", congestion: 80 },
  { road: "Thika Rd", congestion: 60 },
  { road: "Mombasa Rd", congestion: 90 },
  { road: "Kenyatta Ave", congestion: 50 },
];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // 2. Get User Info
  const [dark, setDark] = useState(false);
  const [trafficFilter, setTrafficFilter] = useState("Today");
  
  // 3. State for Real Data
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState({
    activeAlerts: 0,
    congestedRoads: 0
  });

  const toggleTheme = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // 4. Fetch Real Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/incidents");
        const data = await response.json();
        
        setIncidents(data);

        // Calculate Stats based on real data
        const congestionCount = data.filter(i => i.type === "congestion").length;
        setStats({
          activeAlerts: data.length,
          congestedRoads: congestionCount > 0 ? congestionCount : 2 // Fallback to 2 if 0 just for demo visuals
        });

      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    };

    fetchData();
  }, []);

  // Helper for status colors
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-500 font-bold';
      case 'medium': return 'text-orange-500 font-bold';
      case 'low': return 'text-green-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`flex h-screen ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col transition-all duration-300">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">FlowSense</div>
        <nav className="flex-1 px-4 mt-4">
          <ul>
            <li className="py-3 flex items-center gap-3 hover:bg-gray-700 rounded px-2 cursor-pointer transition"><FaTachometerAlt /> Dashboard</li>
            <li className="py-3 flex items-center gap-3 hover:bg-gray-700 rounded px-2 cursor-pointer transition"><FaBell /> Alerts</li>
            <li className="py-3 flex items-center gap-3 hover:bg-gray-700 rounded px-2 cursor-pointer transition"><FaCar /> Cameras</li>
            <li className="py-3 flex items-center gap-3 hover:bg-gray-700 rounded px-2 cursor-pointer transition"><FaCogs /> Settings</li>
          </ul>
        </nav>
        
        {/* User Profile & Logout */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FaUserCircle size={30} />
            <div>
              <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-400">Traffic Controller</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm w-full">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-white transition">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Metrics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Total Vehicles</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white"><CountUp end={1234} duration={2} /></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Avg Speed</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white"><CountUp end={45} duration={2} /> km/h</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Congested Roads</h2>
            <p className="text-2xl font-bold text-yellow-500"><CountUp end={stats.congestedRoads} duration={2} /></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Active Alerts</h2>
            <p className="text-2xl font-bold text-red-500"><CountUp end={stats.activeAlerts} duration={2} /></p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Traffic Flow</h3>
              <select
                value={trafficFilter}
                onChange={(e) => setTrafficFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
              >
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={trafficFlowData[trafficFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: dark ? '#1F2937' : '#fff', borderColor: '#374151' }}
                  itemStyle={{ color: dark ? '#fff' : '#000' }}
                />
                <Line type="monotone" dataKey="vehicles" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-80">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-4">Congestion Levels</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={congestionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="road" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: dark ? '#1F2937' : '#fff', borderColor: '#374151' }}
                />
                <Bar dataKey="congestion" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* REAL ALERTS TABLE */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Traffic Incidents</h3>
            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">Live Feed</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                <tr>
                  <th className="p-4">Time</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {incidents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">No incidents reported recently.</td>
                  </tr>
                ) : (
                  incidents.map((alert) => (
                    <tr key={alert._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4 font-medium text-gray-800 dark:text-white">{alert.location}</td>
                      <td className="p-4 text-sm capitalize">{alert.type}</td>
                      <td className={`p-4 text-sm uppercase ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {alert.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;