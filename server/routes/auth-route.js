const express = require("express");
const router = express.Router();

// ✅ Import controllers and middlewares
const authControllers = require("../controllers/auth-controllers");
const {signupSchema,loginSchema} = require("../validators/auth-validators");
const validate = require("../middleware/validators-middleware");
const authMiddleware = require("../middleware/auth-middleware");

// ✅ Routes

// Home Route
router.get("/", authControllers.home);

// Register Route with validation
router.post("/register", validate(signupSchema), authControllers.register);

// Login Route
router.post("/login",validate(loginSchema),  authControllers.login);

// Protected User Route
router.get("/user", authMiddleware, authControllers.user);

module.exports = router;
