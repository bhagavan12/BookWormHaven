// comp/ProtectedRoute.js
import React from 'react';
import { Navigate,Link } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
