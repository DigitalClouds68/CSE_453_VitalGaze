// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// ✅ 添加测试路由
router.get("/test", (req, res) => {
    res.json({ message: "✅ API 服务器工作正常！" });
});
  
const authController = require('../controllers/authController');

// 登录路由
router.post('/signin', authController.signin);

// 注册路由
router.post('/signup', authController.signup);

module.exports = router;
