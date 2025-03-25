// apiServer.js
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

// 启动服务器
const PORT = process.env.API_PORT || 5000;

// 获取本地 IP 地址,用于一般的非虚拟机环境。
// function getLocalIP() {
//   const interfaces = os.networkInterfaces();
//   for (const name in interfaces) {
//     for (const net of interfaces[name]) {
//       if (net.family === 'IPv4' && !net.internal) {
//         return net.address;
//       }
//     }
//   }
//   return "localhost"; // Fallback
// }

// 本人有虚拟机，用以下代码获取本地 IP 地址
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      // 1) 跳过内网以外
      // 2) 跳过 IPv6
      // 3) 跳过可能是虚拟机网卡 (可用 name.includes('Virtual') 作粗略过滤)
      if (net.family === 'IPv4' && 
          !net.internal && 
          !name.includes('Virtual') &&
          net.address.startsWith('10.') // 如果你常在10.x网段
      ) {
        return net.address;
      }
    }
  }
  return "localhost";
}
///////////////////////////////////////////////////////////////////////////

const localIP = getLocalIP();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${localIP}:${PORT} (Use this for Expo Go)`);
});
