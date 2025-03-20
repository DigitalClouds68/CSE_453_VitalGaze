// routes/trainingRoutes.js
const express = require("express");
const { addTrainingData, getTrainingData } = require("../controllers/trainingController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 测试路由 - 不需要身份验证
router.get("/test", (req, res) => {
  res.json({ message: "Training routes are accessible" });
});

// 添加训练数据（需要身份验证）
router.post("/", authMiddleware, addTrainingData);

// 获取训练数据（需要身份验证）
router.get("/", authMiddleware, getTrainingData);


module.exports = router;