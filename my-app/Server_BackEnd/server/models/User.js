const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
<<<<<<< HEAD
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });  // 自动添加 createdAt 和 updatedAt

// 在保存前加密密码
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  console.log("DEBUG password:", this.password, this.password.length);

  // 密码长度验证
  if (this.password.length < 6 || this.password.length > 20) {
    throw new Error("密码长度必须在 6 到 20 个字符之间");
=======
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
>>>>>>> d39166b64a84c4b3a5a90b6a556b4edfe16541e8
  }
});

// 在保存用户之前加密密码
userSchema.pre("save", async function(next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
