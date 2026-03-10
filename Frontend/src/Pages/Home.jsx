import React from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaBell, FaMapMarkedAlt, FaArrowRight, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="w-full bg-white scroll-smooth">
      
      {/* --- SECTION 1: HERO (Video Background) --- */}
      {/* min-h-[calc(100vh-80px)] ensures it fills the screen below the fixed navbar */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col justify-center shadow-xl">
        
        {/* Video & Overlay */}
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/Videos/traffic_video.mp4" type="video/mp4" />
        </video>
        {/* Darker overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto text-white mt-10">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-down">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> System Online • Nairobi
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Smarter Traffic. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Safer Cities.
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            FlowSense leverages Computer Vision and AI to detect real-time congestion, 
            automate incident reporting, and optimize urban mobility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition transform hover:scale-105 shadow-xl border border-blue-500 flex items-center justify-center gap-2"
            >
              Access Dashboard <FaArrowRight size={16} />
            </Link>
            
            <Link 
              to="/signup" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-2xl text-lg font-bold transition transform hover:scale-105 backdrop-blur-sm"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: FEATURES (Why FlowSense?) --- */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Intelligence at Every Intersection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Replacing manual traffic control with automated, data-driven insights.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border-2 border-blue-300 group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              <FaBrain />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI Object Detection</h3>
            <p className="text-gray-500 leading-relaxed">
              Uses YOLOv8 to classify vehicles (Cars, Buses, Trucks) with high accuracy from live video feeds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border-2 border-blue-300 group">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              <FaBell />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Instant Alerts</h3>
            <p className="text-gray-500 leading-relaxed">
              Automatically triggers audio and visual alarms on the dashboard when congestion density exceeds thresholds.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border-2 border-blue-300 group">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              <FaMapMarkedAlt />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Geospatial Mapping</h3>
            <p className="text-gray-500 leading-relaxed">
              Visualizes incidents on an interactive Leaflet map of Nairobi, pinpointing exact trouble spots in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SYSTEM PREVIEW (The "Proof") --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs mb-4">
              LIVE PREVIEW
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              A Command Center <br /> for <span className="text-blue-600">Modern Cities.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              FlowSense provides traffic controllers with a unified dashboard. Monitor live camera feeds, track congestion trends via charts, and generate PDF incident reports instantly.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Real-time Vehicle Counting', 
                'Historical Data Analysis & Charts', 
                'Role-Based Access Control (Admin/Officer)',
                'Automated PDF Reporting'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCheckCircle className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Laptop Mockup Image */}
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-xl  border-[8px] border-gray-900 bg-gray-900 overflow-hidden transform  transition duration-500">
                {/* Ensure you have this image in public folder */}
                <img src="/dashboard_preview.png" alt="Dashboard Preview" className="w-full h-auto object-cover" />
             </div>
             {/* Decorative blob behind */}
             <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/*SECTION 4: TECH STACK*/}
      <section id="tech" className="py-20 bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <FaLaptopCode className="text-5xl text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-12">Built with Modern Architecture</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
            {/* Tech Stack List */}
            {[
              { name: "MongoDB Atlas", color: "text-green-500" },
              { name: "Express.js", color: "text-gray-300" },
              { name: "React.js", color: "text-blue-400" },
              { name: "Node.js", color: "text-green-400" },
              { name: "Python AI", color: "text-yellow-400" },
              { name: "OpenCV", color: "text-red-400" },
              { name: "Socket.io", color: "text-white" }
            ].map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-2">
                <span className={`text-xl font-bold ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;