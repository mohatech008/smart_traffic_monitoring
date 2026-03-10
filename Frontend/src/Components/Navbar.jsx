import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    {/*State to toggle mobile menu*/}
    const [isOpen, setIsOpen] = useState(false);

    {/*Helper to close menu when a link is clicked*/}
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-blue-500 text-white shadow-md py-4 px-6 z-50">
            
            <div className="flex justify-between items-center">
                
                {/*LEFT: LOGO & BRAND*/}
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

                {/*MIDDLE: DESKTOP LINKS (Hidden on Mobile)*/}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#home" className="text-blue-100 hover:text-white transition cursor-pointer">
                        Home
                    </a>
                    <a href="#features" className="text-blue-100 hover:text-white transition cursor-pointer">
                        Features
                    </a>
                    <a href="#tech" className="text-blue-100 hover:text-white transition cursor-pointer">
                        Technology
                    </a>
                </div>

                {/*RIGHT: AUTH BUTTONS & HAMBURGER*/}
                <div className="flex items-center space-x-3">
                    
                    {/* Auth Buttons*/}
                    <Link
                        to="/login"
                        className="hidden sm:block text-white hover:bg-blue-600 px-4 py-2 rounded-2xl transition duration-200 font-medium"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-white text-blue-600 font-bold px-6 py-2 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition duration-200"
                    >
                        Sign Up
                    </Link>

                    {/*HAMBURGER ICON*/}
                    <button 
                        className="md:hidden text-white focus:outline-none ml-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-blue-600 shadow-xl border-t border-blue-400 animate-fade-in-down">
                    <div className="flex flex-col items-center py-6 space-y-6 font-semibold text-lg">
                        <a href="#home" onClick={closeMenu} className="hover:text-gray-200 transition">
                            Home
                        </a>
                        <a href="#features" onClick={closeMenu} className="hover:text-gray-200 transition">
                            Features
                        </a>
                        <a href="#tech" onClick={closeMenu} className="hover:text-gray-200 transition">
                            Technology
                        </a>
                        
                        {/* Mobile Login Link*/}
                        <Link to="/login" onClick={closeMenu} className="sm:hidden text-blue-100 hover:text-white">
                            Login
                        </Link>
                    </div>
                </div>
            )}

        </nav> 
    );
};

export default Navbar;