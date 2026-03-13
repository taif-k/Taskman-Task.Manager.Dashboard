const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Taskman API running");
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});