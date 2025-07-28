import React, { useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../layout/admin.css";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, loading, isLoggedIn } = useAuth();

  useEffect(() => {
    // Only redirect if loading is complete and user is not logged in
    if (!loading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) return <p>Loading user data...</p>;

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header>
        <main>
          <div className="admin-container">
            <ul>
              <li><NavLink to="/admin/users">Users</NavLink></li>
              <li><NavLink to="/admin/contacts">Contacts</NavLink></li>
              <li><NavLink to="/admin">Services</NavLink></li>
              <li><NavLink to="/admin">Reports</NavLink></li>
            </ul>
          </div>
        </main>
      </header>
      <Outlet />
    </>
  );
};

