const TrainingData = require("../models/TrainingData");

// 添加训练数据
const addTrainingData = async (req, res) => {
  try {
    const {
      trainingType,
      score,
      duration,
      direction,
      speed
    } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: Missing user ID" });
    }

    const newEntry = new TrainingData({
      userId: req.user.userId,  // ← 确保 authMiddleware 设置了这个字段
      trainingType,
      score,
      duration,
      direction,
      speed
    });

    await newEntry.save();
    res.status(201).json({
      success: true,
      message: "Training data added successfully",
      data: newEntry
    });
  } catch (error) {
    console.error("❌ Error in addTrainingData:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 获取当前用户的所有训练数据
const getTrainingData = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: Missing user ID" });
    }

    console.log("✅ Fetching training data for user:", req.user.userId);

    const trainingData = await TrainingData.find({ userId: req.user.userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: trainingData.length,
      data: trainingData
    });
  } catch (error) {
    console.error("❌ Error in getTrainingData:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addTrainingData,
  getTrainingData
};
