import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
