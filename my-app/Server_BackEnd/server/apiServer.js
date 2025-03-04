require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const os = require("os");

const app = express();
connectDB(); // connect to MongoDB

app.use(cors());
app.use(express.json());
app.use(cors());

// Load the API routes
app.use("/api/auth", require("./routes/authRoutes"));

/* ***********************后期补充************************👇*/
//app.use("/api/sessions", require("./routes/sessionRoutes")); // 训练数据 API
//app.use("/api/tracking", require("./routes/trackingRoutes")); // 眼动追踪 API

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
  return "localhost"; // Fallback
}

const localIP = getLocalIP();

app.listen(PORT, () => {
  console.log(`🚀 API server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${localIP}:${PORT} (Use this for Expo Go)`);
});
