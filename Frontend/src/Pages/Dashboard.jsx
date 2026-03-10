import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext.jsx";
import TrafficMap from "../Components/TrafficMap.jsx";
import { io } from "socket.io-client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Components
import Sidebar from "../Components/Dashboard/Sidebar";
import TopBar from "../Components/Dashboard/Topbar";
import Overview from "../Components/Dashboard/Overview";
import Alerts from "../Components/Dashboard/Alerts";
import Cameras from "../Components/Dashboard/Cameras";
import Settings from "../Components/Dashboard/Settings";
import ProfileModal from "../Components/Dashboard/ProfileModal";
import UserModal from "../Components/Dashboard/UserModal";
import { TrafficFlowChart, IncidentPieChart } from "../Components/Dashboard/DashboardCharts.jsx";
import ActivityTicker from "../Components/Dashboard/ActivityTicker.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [dark, setDark] = useState(false);
  const isAdmin = user?.role === 'admin';

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  const [trafficFilter, setTrafficFilter] = useState("Today");
  const [incidents, setIncidents] = useState([]);
  const [flowData, setFlowData] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  // Updated Stats State with defaults for Vehicles and Speed
  const [stats, setStats] = useState({ 
    activeAlerts: 0, 
    congestedRoads: 0,
    totalVehicles: 1250,
    avgSpeed: 60 
  });

  const toggleTheme = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // --- HELPER: PROCESS DATA FOR CHARTS ---
  const processChartData = (incidentList) => {
    const roadCounts = {};
    incidentList.forEach((item) => {
      const roadName = item.location;
      roadCounts[roadName] = (roadCounts[roadName] || 0) + 1;
    });
    setChartData(Object.keys(roadCounts).map((road) => ({ road, congestion: roadCounts[road] * 10 })));
  };

  // --- HELPER: CALCULATE REAL-TIME STATS (THE MISSING CONST) ---
  const calculateStats = (data) => {
    const active = data.length;
    const congestedCount = data.filter(i => i.type === "congestion").length;

    // Logic: Base vehicles + 15 per incident (Simulation of traffic density)
    const vehicles = 1250 + (data.length * 15);

    // Logic: Speed drops as congestion rises
    let speed = 60 - (congestedCount * 5);
    if (speed < 5) speed = 5; // Minimum speed limit

    setStats({
      activeAlerts: active,
      congestedRoads: congestedCount,
      totalVehicles: vehicles,
      avgSpeed: speed
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500 font-bold';
      case 'medium': return 'text-orange-500 font-bold';
      case 'low': return 'text-green-500 font-bold';
      default: return 'text-gray-500';
    }
  };

  // --- API ACTIONS ---
  const handleDeleteIncident = async (id) => {
    if (!window.confirm("WARNING: Are you sure you want to delete this incident log?\n\nThis action cannot be undone and it will be permanently removed from the database.")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/incidents/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if(!res.ok) throw new Error("Failed to delete");

      const updated = incidents.filter(i => i._id !== id);
      setIncidents(updated);
      processChartData(updated);
      calculateStats(updated); // Update stats after delete
      alert("Incident deleted successfully.");
    } catch (e) { 
      alert("Error: Failed to delete incident."); 
    }
  };

  const handleClearDB = async () => {
    if (!window.confirm("CRITICAL WARNING: This will delete ALL traffic history permanently.\n\nAre you absolutely sure you want to wipe the entire database?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/incidents", { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if(!res.ok) throw new Error("Failed to clear");

      setIncidents([]); 
      processChartData([]); 
      calculateStats([]); // Reset stats
      alert("Database Cleared Successfully.");
    } catch (e) { 
      alert("Error: Failed to clear database."); 
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/auth/users", {
        headers: { "Authorization": `Bearer ${token}` } 
      });
      if(!res.ok) throw new Error("Failed");
      setUsersList(await res.json());
      setIsUserModalOpen(true);
    } catch (e) { 
        console.error(e); 
        alert("Failed to load users. Are you an Admin?");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("WARNING: Are you sure you want to delete this user?\n\nThey will lose access to the system immediately. This action cannot be undone.")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if(!res.ok) throw new Error("Failed");

      setUsersList(usersList.filter(u => u._id !== id));
      alert("User deleted successfully.");
    } catch (e) { 
      alert("Error: Failed to delete user."); 
    }
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Traffic Incident Report", 14, 22);
      const rows = incidents.map(i => [new Date(i.timestamp).toLocaleString(), i.location, i.type, i.severity, i.description]);
      autoTable(doc, { head: [["Time", "Location", "Type", "Severity", "Desc"]], body: rows, startY: 30 });
      doc.save("Report.pdf");
    } catch (e) { console.error(e); }
  };

  // --- EFFECT: DATA & SOCKET ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Incidents
        const res = await fetch("http://localhost:5000/api/incidents");
        const data = await res.json();
        setIncidents(data); 
        processChartData(data);
        calculateStats(data); // Calculate initial stats

        // 2. Fetch Traffic Flow (If endpoint exists)
        try {
            const flowRes = await fetch("http://localhost:5000/api/incidents/flow");
            if(flowRes.ok) {
                const flowDataJson = await flowRes.json();
                setFlowData(flowDataJson);
            }
        } catch(err) {
            // Silently fail if flow endpoint not ready, charts handle defaults
            console.log("Flow data not available yet");
        }

      } catch (e) { console.error("Error fetching data:", e); }
    };
    
    fetchData();
    const socket = io("http://localhost:5000");

    socket.on("newIncident", (newData) => {
      setIncidents(p => { 
        const u = [newData, ...p]; 
        processChartData(u); 
        calculateStats(u);
        return u; 
      });

      if (newData.severity === 'high' || newData.severity === 'critical') {
        new Audio("/Sounds/alert.mp3").play().catch(e => console.error(e));
        toast.error(`${newData.type.toUpperCase()}: ${newData.location}`, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
        });
      } else {
        toast.info(`New Incident: ${newData.location}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
        });
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <ToastContainer/>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Modals */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} user={user} updateProfile={updateProfile} />
      <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} usersList={usersList} fetchUsers={fetchUsers} handleDeleteUser={handleDeleteUser} />

      {/* Layout */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} user={user} logout={logout} isAdmin={isAdmin} onProfileClick={() => setIsProfileModalOpen(true)} />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} activeTab={activeTab} user={user} dark={dark} toggleTheme={toggleTheme} />

        {activeTab === "dashboard" && (
          <>
            <Overview stats={stats} incidents={incidents} chartData={chartData} trafficFilter={trafficFilter} setTrafficFilter={setTrafficFilter} getSeverityColor={getSeverityColor} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Main Chart Section - 2/3 width */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Traffic Flow Trend</h3>
                    <p className="text-[10px] text-blue-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      LIVE BACKEND DATA
                    </p>
                  </div>
                  <select 
                    value={trafficFilter}
                    onChange={(e) => setTrafficFilter(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border-none text-xs rounded-lg px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value="Today">Last 24 Hours</option>
                    <option value="Week">Last 7 Days</option>
                  </select>
                </div>
                {/* Passed flowData state to Chart */}
                <TrafficFlowChart data={flowData} />
              </div>

              {/* Right Side Column - Incident Chart & Ticker */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">Incident Types</h3>
                  {/* Passed live incidents to Pie Chart */}
                  <IncidentPieChart incidents={incidents} />
                </div>
                
                {/* Passed live incidents to Ticker */}
                <ActivityTicker incidents={incidents} />
              </div>
            </div>
          </>
        )}

        {activeTab === "alerts" && <Alerts incidents={incidents} stats={stats} downloadPDF={downloadPDF} isAdmin={isAdmin} handleDeleteIncident={handleDeleteIncident} getSeverityColor={getSeverityColor} />}
        {activeTab === "cameras" && <Cameras />}
        {activeTab === "settings" && isAdmin && <Settings dark={dark} toggleTheme={toggleTheme} fetchUsers={fetchUsers} handleClearDB={handleClearDB} />}
      </main>
    </div>
  );
};

export default Dashboard;