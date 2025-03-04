const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // 验证邮箱格式
  },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });  // 自动添加 createdAt 和 updatedAt

// 在保存前加密密码
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // 密码长度验证
  if (this.password.length < 6 || this.password.length > 20) {
    throw new Error("密码长度必须在 6 到 20 个字符之间");
  }

  // 哈希加密密码
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 添加方法：用于密码比对
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema, "vitalgaze_users");
