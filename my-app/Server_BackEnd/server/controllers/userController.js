const User = require("../models/User");

// 获取用户资料
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);  // 从 JWT 中提取用户 ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};

// 更新用户资料
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.userId);  // 从 JWT 中提取用户 ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 检查是否有新的邮箱，且是否已经存在该邮箱
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
      user.email = email;  // 更新邮箱
    }

    // 更新用户名
    if (username) {
      user.username = username;
    }

    await user.save();
    res.json({ message: "User profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
