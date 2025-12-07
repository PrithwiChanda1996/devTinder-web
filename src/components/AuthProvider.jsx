import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const AuthProvider = ({ children }) => {
  const { restoreSession } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Skip session restoration on public pages (root, login, signup)
    const publicPaths = ["/", "/login", "/signup"];
    const isPublicPage = publicPaths.includes(location.pathname);

    if (!isPublicPage) {
      restoreSession();
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
