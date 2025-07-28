import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../components/Navbar.css";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/">QuickFix</NavLink>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <ul onClick={() => setIsOpen(false)}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/service">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/employes">Employees</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>
            {isLoggedIn ? (
              <li><NavLink to="/logout">Logout</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
