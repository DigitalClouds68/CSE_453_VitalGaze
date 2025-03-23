// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 用户注册
exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // 创建用户
    const user = new User({ email, username, password });
    
    // 保存用户
    await user.save();
    
    // 返回成功消息
    res.status(201).json({ message: "User sign up successfully" });
  } catch (error) {
    res.status(400).json({ error: "Sign up failed" });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ email });
    
    // 验证用户是否存在，以及密码是否匹配
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email or password error" });
    }
    
    // 生成 JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    // 返回 token 和用户信息
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Log in failed" });
  }
};