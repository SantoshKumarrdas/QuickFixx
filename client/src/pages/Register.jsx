import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../css/register.css"


export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { saveTokenInLocalStr } = useAuth(); 
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting user:", user);

    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        saveTokenInLocalStr(data.token);
        alert("Registration successful!");
        setUser({ username: "", email: "", phone: "", password: "" });
        console.log(data);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert(`Registration failed: ${errorData.extraDetails || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong while registering. Check the console.");
    }
  };

  return (
    <section className="section-registration">
      <main className="registration-auth-container">
        <div className="registration-auth-left">
          <h2>Welcome Back!</h2>
          <p>Enter your personal details to use all of site features</p>

          <Link to="/login">
            <button className="registration-btn-outline">SIGN IN</button>
          </Link>
        </div>


        <div className="registration-auth-right">
          <h2 className="registration-main-heading">Registration Form</h2>
          <form onSubmit={handleSubmit} className="registration-auth-form">
            <div className="registration-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="registration-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="registration-input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="registration-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="registration-btn-primary">Register Now</button>
          </form>
        </div>
      </main>
    </section>
  );

};
