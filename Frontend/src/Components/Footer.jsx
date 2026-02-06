import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- COLUMN 1: BRAND INFO --- */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">F</div>
            <span className="text-xl font-bold">FlowSense</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Next-generation intelligent traffic monitoring system designed to reduce congestion and improve urban mobility in Nairobi.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500 transition"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaTwitter size={20} /></a>
          </div>
        </div>
        {/* --- COLUMN 2: QUICK LINKS --- */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
            <li><Link to="/login" className="hover:text-blue-500 transition">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-500 transition">Register</Link></li>
            <li><a href="#" className="hover:text-blue-500 transition">Project Documentation</a></li>
          </ul>
        </div>

        {/* --- COLUMN 3: TECHNOLOGIES --- */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Powered By</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> MongoDB Atlas</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Express & Node.js</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> React.js</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> YOLOv8 AI</li>
          </ul>
        </div>

        {/* --- COLUMN 4: CONTACT --- */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-blue-500" />
              <span>Nairobi, Kenya<br/>CUEA University</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <span>support@flowsense.co.ke</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-blue-500" />
              <span>+254 700 000 000</span>
            </li>
          </ul>
        </div>

      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} FlowSense Project. All rights reserved.</p>
        <p>Developed by Mohamed Abdi Ahmed</p>
      </div>
    </footer>
  );
};

export default Footer;