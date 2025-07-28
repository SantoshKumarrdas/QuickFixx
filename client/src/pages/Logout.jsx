import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    // Call logout when the component mounts
    LogoutUser();
  }, []);

  return <Navigate to="/login" replace />;
};
