import React from 'react';
import { FaCircle } from 'react-icons/fa';

const ActivityTicker = ({ incidents = [] }) => {
  {/*Helper to format the time into "2 mins ago" style*/}
  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  {/*We only show the most recent 5 incidents for a clean UI*/}
  const recentIncidents = incidents.slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Live Activity</h3>
        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
      </div>

      <div className="space-y-4">
        {recentIncidents.length > 0 ? (
          recentIncidents.map((incident) => (
            <div key={incident._id} className="flex gap-3 animate-in fade-in slide-in-from-right-2 duration-500">
              <FaCircle className={`mt-1 size-2 flex-shrink-0 ${
                incident.severity === 'high' || incident.severity === 'critical' 
                  ? 'text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                  : 'text-blue-500'
              }`} />
              <div>
                <p className="text-sm dark:text-gray-200 leading-tight font-medium">
                  {incident.type} detected at {incident.location}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-medium uppercase">
                    {formatTimeAgo(incident.timestamp)}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                    {incident.severity}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic py-4 text-center">No recent activity detected.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityTicker;