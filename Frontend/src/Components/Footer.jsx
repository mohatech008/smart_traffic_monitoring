import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/*COLUMN 1: BRAND*/}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">F</div>
            <span className="text-2xl font-bold tracking-tight">FlowSense</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Pioneering AI-driven traffic solutions for smarter, safer, and more efficient urban mobility in Nairobi.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300">
              <FaGithub size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300">
              <FaLinkedin size={14} />
            </a>
          </div>
        </div>

        {/*COLUMN 2: NAVIGATION*/}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Platform</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
            <li><Link to="/login" className="hover:text-blue-500 transition-colors">Live Dashboard</Link></li>
            <li><Link to="/signup" className="hover:text-blue-500 transition-colors">Register Officer</Link></li>
            <li><a href="#features" className="hover:text-blue-500 transition-colors">System Features</a></li>
          </ul>
        </div>

        {/*COLUMN 3: RESOURCES*/}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Resources</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Project Documentation</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">System Architecture</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/*COLUMN 4: CONTACT*/}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-blue-600" />
              <span>Department of Computer Science,<br/>CUEA University, Nairobi.</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span className="hover:text-white transition cursor-pointer">project@flowsense.co.ke</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              <span>+254 700 123 456</span>
            </li>
          </ul>
        </div>

      </div>

      {/*BOTTOM BAR*/}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} FlowSense Project. All rights reserved.</p>
        
       
      </div>
    </footer>
  );
};
export default Footer;