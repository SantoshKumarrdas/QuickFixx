import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const authorization = `Bearer ${token}`;
  const isLoggedIn = !!token;
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Save token to localStorage and state
  const saveTokenInLocalStr = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // ✅ Logout user and clear token
  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // ✅ Auth check from backend
  const userAuthentication = async () => {
    setLoading(true); // start loading
    try {
      const response = await fetch(`${URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.msg); // adjust if backend returns {msg: user}
      } else {
        console.error("Failed to authenticate user");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setUser(null);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setLoading(false); // no token, skip request
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        saveTokenInLocalStr,
        LogoutUser,
        user,
        token,
        authorization,
        loading, // ✅ expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
