const mongoose = require("mongoose");

// 定义训练数据 Schema
const TrainingDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 关联 User 模型
    required: true
  },
  trainingType: {
    type: String,
    required: true,
    enum: ["Fixation", "Saccadic", "Pursuit", "Stability", "Focus Shift", "Reaction Time"]
  },
  score: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // 训练时长（秒）
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 导出模型（修正为标准导出方式）
const TrainingData = mongoose.model("TrainingData", TrainingDataSchema);
module.exports = TrainingData;
