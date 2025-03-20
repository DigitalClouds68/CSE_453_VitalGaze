// controllers/userController.js

// 获取用户信息
exports.getProfile = (req, res) => {
  // 模拟获取用户资料的操作
  res.json({
    message: 'User profile fetched successfully',
    user: {
      username: 'exampleUser',
      email: 'user@example.com',
    },
  });
};

/* 可能用于替换上面一段代码

exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


*/

// 更新用户信息
exports.updateProfile = (req, res) => {
  // 获取请求体中的数据
  const { username, email } = req.body;

  // 模拟更新用户信息
  res.json({
    message: 'User profile updated successfully',
    updatedUser: { username, email },
  });
};
