// server/controllers/trainingController.js
const TrainingData = require('../models/TrainingData');

exports.addTrainingData = async (req, res) => {
  try {
    const { trainingType, score, duration } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    }
    const newTrainingData = new TrainingData({
      userId: req.user.id,
      trainingType,
      score,
      duration
    });
    await newTrainingData.save();
    res.status(201).json({ message: 'Training data added successfully' });
  } catch (error) {
    console.error('Error in addTrainingData:', error);
    res.status(400).json({ message: 'Failed to add training data' });
  }
};

exports.getTrainingData = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    }
    const trainingData = await TrainingData
      .find({ userId: req.user.id })
      .sort({ date: -1 });
    // 返回 { data: [...] } 供前端统一解析
    res.json({ data: trainingData });
  } catch (error) {
    console.error('Error in getTrainingData:', error);
    res.status(400).json({ message: 'Failed to retrieve training data' });
  }
};
