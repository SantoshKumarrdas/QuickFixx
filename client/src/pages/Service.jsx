import React, { useEffect, useState } from "react";
import "../css/service.css"

export const Service = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch services from backend
  const fetchServices = async () => {
    try {
      const response = await fetch(`${URL}/api/data/service`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to fetch services");
      }

      setServices(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="service-container">
      <h2>Available Services</h2>

      {error && <p className="error">{error}</p>}

      {services.length > 0 ? (
        <ul className="service-list">
          
          {services.map((service) => (
            <li key={service._id} className="service-card">
               <img src="/img/ele.jpg" alt="Always ready to help you" />
              <h3>{service.description}</h3>
              <p>Price: ₹{service.price}</p>
              <p style={{ lineHeight: "20px" }}>Provider ID: {service.provider}</p>

            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading services...</p>
      )}
    </div>
  );
};
