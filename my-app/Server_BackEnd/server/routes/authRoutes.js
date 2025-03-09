// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 登录路由
router.post('/login', authController.login);

// 注册路由
router.post('/register', authController.signup);

module.exports = router;
