const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");
const authMiddleware = require("../middleware/authMiddleware");

// 添加训练数据（需验证）
router.post("/", authMiddleware, trainingController.addTrainingData);

// 获取训练数据（需验证）
router.get("/", authMiddleware, trainingController.getTrainingData);

module.exports = router;
