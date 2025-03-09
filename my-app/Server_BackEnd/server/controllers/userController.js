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
