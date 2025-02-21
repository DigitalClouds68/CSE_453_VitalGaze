const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// User SignUp
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).json({ message: "用户注册成功" });
  } catch (error) {
    res.status(400).json({ error: "注册失败" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "邮箱或密码错误" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "登录失败" });
  }
});

module.exports = router;
