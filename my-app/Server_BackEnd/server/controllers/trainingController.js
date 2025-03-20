// controllers/trainingController.js
const TrainingData = require("../models/TrainingData"); // 确保正确导入
const User = require("../models/User");

// 添加训练数据
exports.addTrainingData = async (req, res) => {
  try {
    const { trainingType, score, duration } = req.body;

    // 确保 `req.user` 存在
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    // 创建训练数据对象
    const newTrainingData = new TrainingData({
      userId: req.user.userId, // 通过中间件传入的用户ID
      trainingType,
      score,
      duration
    });

    // 保存到数据库
    await newTrainingData.save();
    res.status(201).json({ message: "Training data added successfully" });
  } catch (error) {
    console.error("Error in addTrainingData:", error);
    res.status(400).json({ error: "Failed to add training data" });
  }
};

// 获取用户的训练数据
exports.getTrainingData = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const trainingData = await TrainingData.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(trainingData);
  } catch (error) {
    console.error("Error in getTrainingData:", error);
    res.status(400).json({ error: "Failed to retrieve training data" });
  }
};
