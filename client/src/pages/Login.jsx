import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../css/login.css"

export const Login = () => {
  const [user, setUser] = useState({
    email: "",        // ✅ email instead of username
    password: "",
  });

  const { saveTokenInLocalStr } = useAuth(); // ✅ must be defined in store/auth.js

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.ok) {
        
        console.log("after login: ", data);

        saveTokenInLocalStr(data.token);  // ✅ store token
        alert("Login successful");
        navigate("/");
      } else {
        navigate("/register"); 
        alert(data.message);
      }
    } catch (error) {
      console.log("Network error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
  <section className="section-login">
    <main className="login-auth-container">
      <div className="auth-right">
        <h2 className="main-heading">Login Form</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Login Now</button>
        </form>
      </div>
       <div className="auth-left">
        <h2>Welcome Back!</h2>
        <p>Enter your personal details to use all of site features</p>
        
           <Link to="/register">
                  <button className="btn-outline">SIGN UP</button>
                </Link>
      </div>

    </main>
  </section>
);

};
