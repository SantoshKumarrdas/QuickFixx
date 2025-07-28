const User = require("../models/user-models");
const bcrypt = require("bcryptjs");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error("Home route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// *-------------------
// Registration Logic (✅ fixed)
// *-------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    console.log("Incoming data:", { username, email, phone, password });

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    console.log("User created:", userCreated);

    const token = userCreated.generateToken(); // this may be crashing

    console.log("Token generated:", token);

    res.status(201).json({
      msg: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Register error:", error); // print full error
    res.status(500).json({ msg: "Error from the Backend", error: error.message });
  }
};


// *-------------------
// Login Logic
// *-------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// *-------------------
// Get Authenticated User
// *-------------------
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(`error from user route: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, user };
