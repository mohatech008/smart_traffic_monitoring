import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

const ProtectedRoute=({children})=>{
    const {user}=useContext(AuthContext);
     //if user is not logged in,redirect to login page
     if (!user){
        return <Navigate to="/login" replace />;

     }
     //If logged in, allow access
     return children;
};

export default ProtectedRoute;