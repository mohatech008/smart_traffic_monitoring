import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      
      {/* --- VIDEO BACKGROUND --- */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="Videos/traffic_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- DARK OVERLAY --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
          Welcome to <span className="text-blue-500">FlowSense</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-10 font-light">
          Next-Generation AI Traffic Monitoring. <br />
          Detect incidents, analyze congestion, and ensure road safety in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition transform hover:scale-105 shadow-xl border border-blue-500"
          >
            Access Dashboard
          </Link>
          
          <Link 
            to="/signup" 
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-2xl text-lg font-semibold transition transform hover:scale-105 backdrop-blur-sm"
          >
            Create Account
          </Link>
        </div>

        {/* Small "Live" Indicator at bottom */}
        <div className="absolute bottom-10 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono tracking-widest uppercase">System Online • Nairobi</span>
        </div>

      </div>
    </div>
  );
};

export default Home;