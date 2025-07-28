import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ import toast if using notifications
import "../css/upload.css";

export const UploadForm = ({ onUploadSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    price: "",
    occupation: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("phone", form.phone);
    data.append("email", form.email);
    data.append("city", form.city);
    data.append("address", form.address);
    data.append("price", form.price);
    data.append("occupation", form.occupation);
    data.append("image", form.image);

    try {
      const response = await axios.post(`${URL}/api/upload`, data);

      if (response.status === 200 || response.status === 201) {
        alert("Upload successful!");
        onUploadSuccess();
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Try again.");
    }
  };

 return (
  <div className="upload-section">
    <div className="upload-card">
      {/* Left side description */}
      <div className="upload-left">
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          ex consequatur reiciendis distinctio, provident in quod quas at
          aliquid, labore officia odio quia quisquam voluptatem sint?
          Perferendis harum sequi accusantium!
        </p>
      </div>

      {/* Right side form */}
      <div className="upload-right">
        <h2 className="upload-heading">Employees Data</h2>

        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="upload-form"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <button id="upload-form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
);


};
