import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md z-50 w-full">
            
            {/* --- LEFT: LOGO & BRAND --- */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
                <img 
                    src="/Images/Flowsense.png" 
                    alt="FlowSense Logo" 
                    className="h-10 w-10 rounded-full bg-white p-0.5" 
                />
                <span className="font-bold text-xl tracking-wide">
                    FlowSense
                </span>
            </Link>

            {/* --- RIGHT: AUTH BUTTONS --- */}
            <div className="flex items-center space-x-4">
                <Link
                    to="/login"
                    className="bg-white text-blue-600 rounded-2xl hover:text-gray-100 font-medium px-4 py-2 transition duration-200"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="bg-white text-blue-600 font-bold px-6 py-2 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition duration-200"
                >
                    Sign Up
                </Link>
            </div>
        </nav> 
    );
};

export default Navbar;