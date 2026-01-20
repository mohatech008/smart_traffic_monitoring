import React, { useState } from "react";
import { FiAlertTriangle, FiClock, FiMapPin, FiFilter, FiEye } from "react-icons/fi";

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Sample demo alerts (replace with backend later)
  const alerts = [
    {
      id: 1,
      type: "Accident",
      location: "Nairobi CBD – Haile Selassie Avenue",
      time: "5 mins ago",
      status: "Critical",
    },
    {
      id: 2,
      type: "Heavy Traffic",
      location: "Thika Road – Survey Area",
      time: "12 mins ago",
      status: "Moderate",
    },
    {
      id: 3,
      type: "Overspeeding",
      location: "Mombasa Road – Cabanas",
      time: "20 mins ago",
      status: "Warning",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Traffic Alerts & Incident Reports
      </h1>

      {/* Filter Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FiAlertTriangle size={20} /> Active Alerts
        </h2>

        <button className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-lg hover:bg-blue-700">
          <FiFilter size={18} />
          Filter
        </button>
      </div>

      {/* Alerts Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Alert Type</th>
              <th className="p-3">Location</th>
              <th className="p-3">Time</th>
              <th className="p-3">Severity</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{alert.type}</td>
                <td className="p-3">{alert.location}</td>
                <td className="p-3 flex items-center gap-2">
                  <FiClock className="text-gray-500" /> {alert.time}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-white text-xs rounded-lg ${
                      alert.status === "Critical"
                        ? "bg-red-600"
                        : alert.status === "Moderate"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {alert.status}
                  </span>
                </td>

                {/* VIEW DETAILS BUTTON */}
                <td className="p-3 text-center">
                  <button
                    className="text-primary hover:underline flex items-center gap-1 mx-auto"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <FiEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FOR ALERT DETAILS */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FiAlertTriangle /> {selectedAlert.type} Alert
            </h2>

            <p className="text-gray-700 mb-3 flex items-center gap-2">
              <FiMapPin className="text-red-600" /> {selectedAlert.location}
            </p>

            <p className="text-gray-600">Reported: {selectedAlert.time}</p>

            <p className="mt-2">
              Severity:{" "}
              <span
                className={`px-3 py-1 text-white text-sm rounded-lg ${
                  selectedAlert.status === "Critical"
                    ? "bg-red-600"
                    : selectedAlert.status === "Moderate"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              >
                {selectedAlert.status}
              </span>
            </p>

            <button
              className="mt-6 w-full bg-primary text-white p-2 rounded-lg hover:bg-blue-700"
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
