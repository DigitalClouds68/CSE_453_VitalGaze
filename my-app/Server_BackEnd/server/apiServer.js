require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const os = require("os");

const app = express();
connectDB(); // Connect to MongoDB

// Middleware setup
app.use(cors());
app.use(express.json());

// Load the API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));  // 用户路由
app.use("/api/training", require("./routes/trainingRoutes"));  // 训练数据路由
// Load the API routes

// Catch-all error handler for uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.API_PORT || 5000;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address; // Returns local network IP
      }
    }
  }
  return "localhost"; // Fallback to localhost
}

const localIP = getLocalIP();

app.listen(PORT, () => {
  console.log(`🚀 API server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${localIP}:${PORT} (Use this for Expo Go)`);
});
