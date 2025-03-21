const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 更新用户名
exports.getProfile = async (req, res) => {
  try {
    console.log('获取用户资料 - 用户ID:', req.user.userId); // 打印用户ID

    // 使用用户ID从数据库查询用户信息
    const user = await User.findById(req.user.userId);

    // 如果没有找到用户
    if (!user) {
      return res.status(404).json({
        message: '用户未找到'
      });
    }

    // 返回实际的用户资料
    res.json({
      message: '用户资料获取成功',
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('获取用户资料失败:', error);
    res.status(500).json({
      message: '服务器错误，无法获取用户资料'
    });
  }
};
exports.changeUsername = async (req, res) => {
  const { newUsername } = req.body;

  try {
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) return res.status(400).json({ error: '用户名已存在' });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username: newUsername },
      { new: true }
    );

    res.json({ message: '用户名更改成功', newUsername: user.username });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: '用户不存在' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: '旧密码错误' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: '密码更改成功' });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.changeEmail = async (req, res) => {
  const { newEmail } = req.body;

  try {
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) return res.status(400).json({ error: '邮箱已被使用' });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { email: newEmail },
      { new: true }
    );

    res.json({ message: '邮箱更改成功', newEmail: user.email });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
};