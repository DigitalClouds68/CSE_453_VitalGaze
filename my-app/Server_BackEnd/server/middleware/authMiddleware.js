// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log('Authorization header:', req.header("Authorization"));
    
    // 检查 Authorization 头是否存在
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.log('Authorization header is missing');
      return res.status(401).json({ error: "Authentication token missing" });
    }
    
    // 提取 token
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      console.log('Token is empty after Bearer prefix removal');
      return res.status(401).json({ error: "Authentication token missing" });
    }
    
    // 验证 token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set!');
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);
      req.user = { userId: decoded.userId }; // 将用户 ID 存储在请求中
      next();
    } catch (tokenError) {
      console.error('Token verification failed:', tokenError.message);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  } catch (error) {
    console.error('Unexpected error in auth middleware:', error);
    res.status(500).json({ error: "Authentication error" });
  }
};

module.exports = authMiddleware;
