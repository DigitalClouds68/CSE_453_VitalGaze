const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { username }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }
    res.json({ message: "用户名更新成功", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: "更新用户名失败", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 获取当前用户
    const user = await User.findById(req.user.userId); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 比对旧密码是否正确
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    // 直接赋值新密码，save() 时会触发 pre-save 钩子加密
    user.password = newPassword;
    await user.save(); 

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changeEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }
    res.json({ message: "邮箱更新成功", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: "更新邮箱失败", error: error.message });
  }
};