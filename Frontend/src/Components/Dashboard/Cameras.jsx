import React, { useRef } from "react";
import { FaVideo, FaExclamationTriangle, FaExpand } from "react-icons/fa";

// --- SUB-COMPONENT FOR INDIVIDUAL CAMERA ---
// This allows each camera to handle its own Full Screen logic
const CameraCard = ({ cam }) => {
  const containerRef = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter Full Screen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Safari */
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      // Exit Full Screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef} // Reference this div for fullscreen
      className="bg-black rounded-xl overflow-hidden shadow-lg relative group border border-gray-800 flex flex-col"
    >
      
      {/* Video Container */}
      <div className="h-64 bg-gray-900 flex items-center justify-center relative overflow-hidden flex-grow">
        
        {cam.isLive ? (
          // REAL AI STREAM
          <img 
            src={cam.url} 
            alt="Live AI Feed" 
            className="w-full h-full object-cover"
            onError={(e) => {
                e.target.style.display='none'; // Hide if python script isn't running
                e.target.nextSibling.style.display='flex'; // Show error message
            }}
          />
        ) : (
          // OFFLINE CAMERA
          <div className="flex flex-col items-center text-gray-600">
            <FaVideo size={40} className="mb-2" />
            <span className="text-xs uppercase tracking-widest">Signal Lost</span>
          </div>
        )}

        {/* Fallback Error Message for Cam 1 */}
        <div className="hidden absolute inset-0 flex-col items-center justify-center text-gray-500 bg-gray-900 z-0">
           <FaExclamationTriangle size={30} className="mb-2 text-yellow-600" />
           <p className="text-xs">AI Engine Offline</p>
           <p className="text-[10px] text-gray-600 mt-1">Run: python ai_stream_server.py</p>
        </div>

        {/* Overlays */}
        {cam.isLive && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse shadow-md">
            ● LIVE
          </div>
        )}
        <p className="absolute bottom-4 left-4 text-white font-bold bg-black/60 px-3 py-1 rounded text-xs backdrop-blur-sm">
          {cam.name}
        </p>
      
      </div>

      {/* Camera Footer */}
      <div className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center border-t dark:border-gray-700">
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cam.isLive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300">
                {cam.isLive ? "Processing Data..." : "Offline"}
            </span>
         </div>
         
         {/* FULL SCREEN BUTTON */}
         <button 
            onClick={toggleFullScreen}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white px-3 py-1 rounded hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition flex items-center gap-2"
         >
            <FaExpand /> Full Screen
         </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Cameras = () => {
  const cameraFeeds = [
    { id: 1, name: "Mombasa Road (AI Active)", url: "http://localhost:5001/video_feed", isLive: true },
    { id: 2, name: "Thika Superhighway", url: null, isLive: false },
    { id: 3, name: "Waiyaki Way", url: null, isLive: false },
    { id: 4, name: "Langata Road", url: null, isLive: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {cameraFeeds.map((cam) => (
        <CameraCard key={cam.id} cam={cam} />
      ))}
    </div>
  );
};

export default Cameras;