require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/auth-route");
const contactRoute = require("./routes/contact-route");
const errorMiddleware = require("./middleware/error-midleware");
const path = require("path");
const service = require ("./routes/service-route")
const adminRoute=require("./routes/admin-route")
const paymentRoutes = require("./routes/paymentRoute");
const usersRoutes = require("./routes/usersRoutes")


const app = express();

// ✅ Required to parse JSON request bodies
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Optional: Logs all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} | Body:`, req.body);
  next();
});

// ✅ CORS Configuration
const corsOptions = {
  origin:  ["http://localhost:5173", "https://quick-fixx.vercel.app"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Routes
app.use("/api/auth", authRoutes);      // auth/register, auth/login etc.
app.use("/api/form", contactRoute); 
app.use("/api/data", service); 
app.use("/api/admin", adminRoute);    // form/contact etc.
app.use("/api", paymentRoutes);

app.use("/api", usersRoutes);



// ✅ Error middleware should be last
app.use(errorMiddleware);

// ✅ Server start with DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
