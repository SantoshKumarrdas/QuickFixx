import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-column">
          <h2 className="footer-title">MyCompany</h2>
          <p className="footer-desc">
            Delivering quality service and innovation across all platforms.
          </p>
          <p className="footer-small">© 2025 MyCompany. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-list">
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/faq">FAQ</NavLink></li>
            <li><NavLink to="/support">Support</NavLink></li>
            <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-column">
          <h3 className="footer-heading">Subscribe</h3>
          <p className="footer-text">Get the latest updates right in your inbox.</p>
          <form className="footer-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>
    </footer>
  );
};
