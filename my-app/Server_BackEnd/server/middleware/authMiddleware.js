const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // 将用户 ID 存储在请求中
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
