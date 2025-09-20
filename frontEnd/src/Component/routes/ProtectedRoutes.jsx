import React from 'react'
  import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role?.trim().toUpperCase())) {
    // logged in but role is not allowed → go to landing page or error page
    return <Navigate to="/" replace />;
  }

  return children; // ✅ allowed → show component
};

export default ProtectedRoutes;

