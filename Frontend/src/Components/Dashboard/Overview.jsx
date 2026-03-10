import React from "react";
import CountUp from "react-countup";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import TrafficMap from "../TrafficMap";

const Overview = ({ stats, incidents, chartData, trafficFilter, setTrafficFilter, trafficFlowData, getSeverityColor }) => {
  return (
    <div className="animate-fade-in">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { 
            title: "Total Vehicles", 
            value: stats.totalVehicles || 0, // <--- NOW USING REAL DATA
            unit: "", 
            color: "gray" 
          },
          { 
            title: "Avg Speed", 
            value: stats.avgSpeed || 0,      // <--- NOW USING REAL DATA
            unit: "km/h", 
            color: "gray" 
          },
          { 
            title: "Congested Roads", 
            value: stats.congestedRoads, 
            unit: "", 
            color: "yellow", 
            textClass: "text-yellow-500" 
          },
          { 
            title: "Active Alerts", 
            value: stats.activeAlerts, 
            unit: "", 
            color: "red", 
            textClass: "text-red-500" 
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-gray-500 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wide">{item.title}</h2>
            <p className={`text-2xl font-bold ${item.textClass || "text-gray-800 dark:text-white"}`}>
              <CountUp end={item.value} duration={2} /> <span className="text-sm font-normal">{item.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Map & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <div className="h-full w-full"><TrafficMap incidents={incidents} /></div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow h-80 lg:h-full">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-lg mb-4">Congestion Levels</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey="road" stroke="#9CA3AF" tick={{fontSize: 10}} />
              <YAxis stroke="#9CA3AF" tick={{fontSize: 10}} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
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
  );
};

export default Overview;