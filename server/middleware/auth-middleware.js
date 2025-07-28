const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Remove "Bearer" and trim the token
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Received token:", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("Verified token payload:", isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    next(); // proceed to route handler
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
