import React from "react";
import { FaFilePdf, FaExclamationTriangle, FaTrash } from "react-icons/fa";

const Alerts = ({ incidents, stats, downloadPDF, isAdmin, handleDeleteIncident, getSeverityColor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-fade-in">
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Full Incident History</h3>
        <div className="flex gap-2">
           <button onClick={downloadPDF} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2 transition shadow-md"><FaFilePdf /> Download PDF</button>
           <span className="bg-blue-100 text-blue-600 px-3 py-2 rounded-full text-xs font-bold flex items-center">{stats.activeAlerts} Active</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="p-4">Time</th><th className="p-4">Location</th><th className="p-4">Type</th><th className="p-4">Severity</th><th className="p-4">Description</th>{isAdmin && <th className="p-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {incidents.map((alert) => (
              <tr key={alert._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-4 text-gray-600 dark:text-gray-300">{new Date(alert.timestamp).toLocaleString()}</td>
                <td className="p-4 font-medium text-gray-800 dark:text-white flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> {alert.location}</td>
                <td className="p-4 capitalize">{alert.type}</td>
                <td className={`p-4 uppercase text-xs font-bold ${getSeverityColor(alert.severity)}`}>{alert.severity}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">{alert.description}</td>
                {isAdmin && (
                  <td className="p-4 text-center">
                    <button onClick={() => handleDeleteIncident(alert._id)} className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded transition" title="Delete Incident"><FaTrash /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alerts;