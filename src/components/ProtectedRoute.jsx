import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuthLoading } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { isAuthLoading } = useAuthLoading();

  // Show loading state while checking authentication
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
