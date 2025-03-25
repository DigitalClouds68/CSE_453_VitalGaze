const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const os = require('os');
require("dotenv").config(); // 

const app = express();

// 连接到 MongoDB
connectDB();

// 中间件设置
// ✅ 只调用一次 CORS，确保 Expo Go 可访问
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 加载 API 路由
app.use('/api/auth', require('./routes/authRoutes'));  // 认证路由
app.use('/api/user', require('./routes/userRoutes'));  // 用户相关路由
app.use('/api/training', require('./routes/trainingRoutes'));  // 训练相关路由

// 错误处理
app.use((err, req, res, next) => {
  console.error("💥 ERROR:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 获取本地 IP 地址的函数
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      // 过滤掉 IPv6、虚拟机网卡，并且排除内部环回地址
      if (net.family === 'IPv4' && !net.internal && !name.includes('Virtual')) {
        // 确保我们返回一个 10.x.x.x 网段的 IP 地址
        if (net.address.startsWith('10.') || net.address.startsWith('192.') || net.address.startsWith('172.')) {
          return net.address;
        }
      }
    }
  }
  return "localhost";  // 如果没有找到符合条件的 IP 地址，回退到 localhost
}

///////////////////////////////////////////////////////////////////////////

// 获取本地网络 IP
const localIP = getLocalIP();
const PORT = process.env.API_PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${localIP}:${PORT} (Use this for Expo Go)`);
});
