// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 导入控制器

// 路由：获取用户信息
router.get('/profile', userController.getProfile);

// 路由：更新用户信息
router.put('/profile', userController.updateProfile);

// 导出路由
module.exports = router;
