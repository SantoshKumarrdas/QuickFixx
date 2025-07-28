const Service = require("../models/service-model");

const service = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }

    // ✅ Success response
    return res.status(200).json(response);
    
  } catch (error) {
    console.error("Service fetch error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = service;
