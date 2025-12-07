import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // If user is already logged in, redirect to feed page
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};

export default PublicRoute;
