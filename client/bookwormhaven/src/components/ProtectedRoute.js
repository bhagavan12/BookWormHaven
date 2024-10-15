// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token'); // Assuming user is stored in userSlice

  return token ? children : <Navigate to="/" />; // Redirect to login if user is not authenticated
};

export default ProtectedRoute;
