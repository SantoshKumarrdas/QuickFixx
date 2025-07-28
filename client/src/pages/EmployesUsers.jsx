// frontend/src/App.js or Employes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/upload.css";

export const Employes = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const handlechange = () => {
    toast.success('Booking Confirmed !');
    console.log('User clicked Book Now');
  };

  return (
    <div className="user-list">
      <div className="user-list-headline">
        <h2>All Employes Users</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores facilis iste quod expedita nihil...</p>
      </div>

      <div className="userlist-card">
        {users.map((u) => (
          <div className="user-card" key={u._id}>
            <img
              src={`${URL}/uploads/${u.image}`}
              alt={u.name || "User"}
              className="user-avatar"
            />
            <div className="user-info">
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>City:</strong> {u.city}</p>
              <p><strong>Address:</strong> {u.address}</p>
              <p><strong>Phone:</strong> {u.phone}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Price:</strong> ₹{u.price}</p>
              <button
                id="user-info-button"
                onClick={handlechange}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification container */}
      <ToastContainer position="top-right" />
    </div>
  );
};
