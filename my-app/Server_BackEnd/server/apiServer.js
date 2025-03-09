// apiServer.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const os = require('os');

const app = express();

// 连接到 MongoDB
connectDB();

// 中间件设置
app.use(cors());
app.use(express.json());

// 加载 API 路由
app.use('/api/auth', require('./routes/authRoutes'));  // 认证路由
app.use('/api/user', require('./routes/userRoutes'));  // 用户相关路由
app.use('/api/training', require('./routes/trainingRoutes'));  // 训练相关路由

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 启动服务器
const PORT = process.env.API_PORT || 5000;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.listen(PORT, () => {
  console.log(`🚀 API server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://${localIP}:${PORT} (Use this for Expo Go)`);
});
