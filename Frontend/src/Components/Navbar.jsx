import React ,{useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
const Navbar=()=>{
    const {user,logout}=useContext(AuthContext);
const navigate=useNavigate();

const handleLogout=()=>{
    logout();
    navigate('/login');
};
return(
    <nav className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
    {/*Logo and Brand Name*/}
        <div className="flex items-center space-x-3">
            <img src="Images/Flowsense.png" alt="logo" className="h-12 w-12 rounded-full"/>
            <span className="font-semibold text-lg tracking-wide">
                FlowSense
            </span>
        </div>
        {/*Right section Links +user info */}
        <div className="flex items-center space-x-5">
            {user &&(
                <>
                <Link to="/"className="hover:underline">Dashboard</Link>
                <Link to ="/live" className="hover:underline">Live Feed</Link>
                <Link to ="/alerts" className="hover:underline">Alerts</Link>
                </>
            )}

            {user? (
                <button
                onClick={handleLogout}
                className="bg-white text-primary px-3 py-1 rounded-lg hover:bg-gray-200 trabsition">
                    Logout
                </button>

            ):(
                <Link
                to="/login"
                className="bg-white text-primary px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                    Login
                </Link>

            )
        }
        {!user && (
  <Link
    to="/signup"
    className="bg-white text-primary px-3 py-1 rounded-lg hover:bg-gray-200 transition"
  >
    Sign Up
  </Link>
)}
        </div>
    </nav> 
)
}
export default Navbar;