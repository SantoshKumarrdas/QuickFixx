// routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/Users-model");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST: Upload user data
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name,phone,email, city,address,price,occupation} = req.body;
    const image = req.file.filename;

    const user = new User({  name,phone,email, city,address,price,occupation, image });
    await user.save();
    res.json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// GET: Fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
