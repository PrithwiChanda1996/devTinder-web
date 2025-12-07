import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

const RootRedirect = () => {
  const user = useSelector((state) => state.user);
  const { restoreSession } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Try to restore session on mount
    const checkSession = async () => {
      await restoreSession();
      setChecking(false);
    };
    checkSession();
  }, []);

  // Show loading or nothing while checking
  if (checking) {
    return null;
  }

  // Redirect based on authentication state
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RootRedirect;
