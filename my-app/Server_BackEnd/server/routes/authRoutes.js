const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// 用户注册
router.post("/signup", signup);

// 用户登录
router.post("/login", login);

module.exports = router;
