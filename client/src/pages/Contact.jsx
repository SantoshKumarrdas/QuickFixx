import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import "../css/contact.css"

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();
   const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Pre-fill the form with authenticated user's data if available
  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Handle input field changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message || "Message sent successfully!");
        console.log(responseData);
        setData(defaultContactFormData);
      } else {
        console.error("API Error:", response.status, response.statusText);
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Server error. Please try later.");
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>

        <div className="container grid grid-half-cols">
          <div className="contact-img">
            <img src="/img/ele.jpg" alt="Always ready to help you" />
          </div>

          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={data.message}
                  onChange={handleInput}
                  required
                />
              </div>

              <button type="submit">Send Message</button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
