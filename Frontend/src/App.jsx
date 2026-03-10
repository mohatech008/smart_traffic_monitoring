import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import Footer from './Components/Footer.jsx'; 
import { ToastProvider } from './Contexts/ToastContext.jsx';
import Navbar from './Components/Navbar.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Home from './Pages/Home.jsx'; 
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
{/*LAYOUTS*/}
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

const PrivateLayout = () => {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider> 
        <BrowserRouter>
          <Routes>
            
            {/*PUBLIC ROUTES GROUP*/}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

            {/*PRIVATE ROUTES GROUP */}
            <Route element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;