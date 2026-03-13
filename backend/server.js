require("dotenv").config()

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: "https://task-manager-figma.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Handle preflight requests
// app.options("/*", cors());


//   Middleware

app.use(express.json());


//   Database Connection
connectDB();


//   Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Taskman API running");
});


//   Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});