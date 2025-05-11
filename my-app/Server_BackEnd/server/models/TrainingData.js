const mongoose = require("mongoose");

// 定义训练数据 Schema，支持 LED 模式
const TrainingDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  trainingType: {
    type: String,
    required: true,
    enum: ["Fixation", "Saccadic", "Pursuit", "Stability", "Focus Shift", "Reaction Time", "LED"]
  },
  score: {
    type: Number
  },
  duration: {
    type: Number  // 单位：毫秒
  },
  direction: {
    type: String,
    enum: ["CW", "CCW"]
  },
  speed: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const TrainingData = mongoose.model("TrainingData", TrainingDataSchema);
module.exports = TrainingData;
