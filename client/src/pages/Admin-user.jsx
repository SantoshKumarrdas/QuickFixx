import { useState, useEffect } from "react";

import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import "../css/adminuser.css"


export const Adminuser = () => {
  const { authorization } = useAuth();
  const [users, setUsers] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const getAllUserData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ DELETE USER FUNCTION
  const deleteUserById = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${URL}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove deleted user from state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin - All Users</h1>

      <div style={{ overflowX: "auto" }}>
        <table >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Is Admin?</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Name">{user.username}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone">{user.phone}</td>
                  <td data-label="Update"><Link to={`/admin/users/edit/${user._id}`}>Edit</Link></td>
                  <td data-label="Is Admin?">{user.isAdmin ? "Yes" : "No"}</td>
                  <td data-label="Delete">
                    <button onClick={() => deleteUserById(user._id)}>Delete</button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
