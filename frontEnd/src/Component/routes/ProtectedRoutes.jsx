import React from 'react'
  import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role").trim().toUpperCase();

  const getDashboardPath= (userRole)=>{
    switch(userRole){
      case 'STUDENT':
      return '/student';
      case 'SUPERVISOR':
        return '/supervisor';
        case 'ADMIN':
          return '/admin';
          default:
            return '/'
    }
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }
  return children; // ✅ allowed → show component
};

export default ProtectedRoutes;

