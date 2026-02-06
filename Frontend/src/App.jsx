import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Footer from './Components/Footer.jsx'; 

// Components
import Navbar from './Components/Navbar.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

// Pages
import Home from './Pages/Home.jsx'; 
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Dashboard from './Pages/Dashboard.jsx';

// --- LAYOUTS ---
// 1. Layout for Public Pages (Shows Navbar)
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
      <Outlet />
      </div>
       <Footer />
    </div>
  );
};

// 2. Layout for Private Pages (Hides Navbar, Full Screen)
const PrivateLayout = () => {
  return (
    <div className="h-screen w-full">
      <Outlet /> {/* This represents the Dashboard */}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* --- PUBLIC ROUTES GROUP (Has Navbar) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* --- PRIVATE ROUTES GROUP (No Navbar, Protected) --- */}
          <Route element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;