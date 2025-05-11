// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 把用户 ID 放到 req.user.id（不要用 userId）
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
