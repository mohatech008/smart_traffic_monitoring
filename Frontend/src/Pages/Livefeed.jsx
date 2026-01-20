import React from "react";
import { FiCamera, FiRefreshCw, FiMapPin, FiActivity } from "react-icons/fi";

const LiveFeed = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Live Traffic Monitoring
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Camera Feed Section */}
        <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FiCamera size={20} />
              Live Camera Feed
            </h2>

            <button className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              <FiRefreshCw size={18} />
              Refresh Feed
            </button>
          </div>

          {/* Placeholder Stream */}
          <div className="w-full h-80 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
            <p>Camera Stream Loading...</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FiActivity size={20} />
            Real-Time Stats
          </h2>

          <div className="space-y-4">
            {/* Vehicles Count */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-500">Vehicle Count</h3>
              <p className="text-xl font-bold text-gray-800">--</p>
            </div>

            {/* Traffic Status */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-500">Traffic Density</h3>
              <p className="text-xl font-bold text-gray-800">--</p>
            </div>

            {/* Alerts */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm text-gray-500">Active Alerts</h3>
              <p className="text-xl font-bold text-gray-800">--</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FiMapPin size={20} />
          Camera & Incident Map
        </h2>

        {/* Placeholder Map */}
        <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
          <p>Map Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
