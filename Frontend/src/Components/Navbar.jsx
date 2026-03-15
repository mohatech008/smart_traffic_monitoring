import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
    // State to toggle mobile menu
    const [isOpen, setIsOpen] = useState(false);

    // Helper to close menu when a link is clicked
    const closeMenu = () => setIsOpen(false);

    return (
        // Adjusted padding (py-3 sm:py-4) so it takes up less vertical space on mobile
        <nav className="fixed top-0 left-0 w-full bg-blue-500 text-white shadow-md py-3 sm:py-4 px-4 sm:px-6 z-50">
            
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                
                {/* --- LEFT: LOGO & BRAND --- */}
                <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition">
                    {/* Image shrinks slightly on small screens (h-8 w-8) */}
                    <img 
                        src="/Images/Flowsense.png" 
                        alt="FlowSense Logo" 
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white p-0.5" 
                    />
                    <span className="font-bold text-lg sm:text-xl tracking-wide">
                        FlowSense
                    </span>
                </Link>

                {/* --- MIDDLE: DESKTOP LINKS (Hidden on Mobile) --- */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#home" className="text-blue-100 hover:text-white transition cursor-pointer">Home</a>
                    <a href="#features" className="text-blue-100 hover:text-white transition cursor-pointer">Features</a>
                    <a href="#tech" className="text-blue-100 hover:text-white transition cursor-pointer">Technology</a>
                </div>

                {/* --- RIGHT: AUTH BUTTONS & HAMBURGER --- */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    
                    {/* Auth Buttons: Hidden on mobile (sm:flex ensures they only show on tablets/desktops) */}
                    <div className="hidden sm:flex items-center space-x-3">
                        <Link
                            to="/login"
                            className="text-white hover:bg-blue-600 px-4 py-2 rounded-2xl transition duration-200 font-medium"
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

                    {/* --- HAMBURGER ICON (Visible on Mobile) --- */}
                    <button 
                        className="md:hidden text-white p-2 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE MENU DROPDOWN --- */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-blue-600 shadow-xl border-t border-blue-400 animate-fade-in-down">
                    <div className="flex flex-col items-center py-6 space-y-5 font-semibold text-lg">
                        <a href="#home" onClick={closeMenu} className="hover:text-gray-200 transition">Home</a>
                        <a href="#features" onClick={closeMenu} className="hover:text-gray-200 transition">Features</a>
                        <a href="#tech" onClick={closeMenu} className="hover:text-gray-200 transition">Technology</a>
                        
                        {/* Mobile Auth Links (Moved here from the top bar) */}
                        <Link to="/login" onClick={closeMenu} className="text-blue-100 hover:text-white pb-2">
                            Login
                        </Link>
                        <Link to="/signup" onClick={closeMenu} className="bg-white text-blue-600 px-10 py-3 rounded-full shadow-md text-base">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}

        </nav> 
    );
};

export default Navbar;