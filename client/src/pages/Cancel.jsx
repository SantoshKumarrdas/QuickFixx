// Cancel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/cancel.css"

const Cancel = () => {
  return (
    <div className="stripe-page">
      <h2>❌ Payment Cancelled</h2>
      <p>Your transaction was not completed. You can try again anytime.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
};

export default Cancel;
