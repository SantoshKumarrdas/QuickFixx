import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import "../css/admincontact.css"
export const Admincontact = () => {
  const { authorization } = useAuth();
  const [contacts, setContacts] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Fetch all contact messages
  const getAllContactData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ Delete contact by ID
  const deleteContactById = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${URL}/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Contact deleted successfully.");
        // Refresh the list after delete
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } else {
        console.error("Failed to delete contact:", data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getAllContactData();
  }, []);

  return (
    <>


      <div className="admin-table-wrapper">
        <h1>Admin - Contact Messages</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="5">No contacts found</td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button onClick={() => deleteContactById(contact._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>

  );
};
