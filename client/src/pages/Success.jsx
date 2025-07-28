// Success.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/cancel.css"

const Success = () => {
  return (
    <div className="stripe-page">
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your purchase. Your transaction has been completed.</p>
      <Link to="/" className="btn">Go to Home</Link>
    </div>
  );
};

export default Success;
