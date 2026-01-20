import React from 'react';
import Navbar from './Components/Navbar.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Livefeed from './Pages/Livefeed.jsx';
import Alerts from './Pages/Alerts.jsx';
 function App() {

   return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
      </ProtectedRoute>
      
  } 
/>
<Route
path="/livefeed"
element={
  <ProtectedRoute>
 <Livefeed/>
 </ProtectedRoute>
}
/>
<Route
path="/alerts"
element={
  <ProtectedRoute>
    <Alerts/>
    </ProtectedRoute>
}
/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
);
 }
export default App;

