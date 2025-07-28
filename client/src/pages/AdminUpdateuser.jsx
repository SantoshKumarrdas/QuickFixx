import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../css/edit.css"

export const AdminUpdateUser = () => {
  const { authorization } = useAuth();
  const { id } = useParams(); // get user ID from URL
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  // Fetch user data to prefill the form
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          username: data.username,
          email: data.email,
          phone: data.phone,
          isAdmin: data.isAdmin,
        });
      } else {
        console.error("Error fetching user:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit updated user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/admin/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User updated successfully!");
        navigate("/admin/users");
      } else {
        console.error("Update failed:", data.message);
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

 return (
  <div className="admin-edit-container">
    <h2>Update User</h2>
    <form className="admin-edit-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>

      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>

      <label className="checkbox-label">
        <span>Is Admin:</span>
        <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
      </label>

      <button type="submit" className="btn-update">Update</button>
    </form>
  </div>
);

};

