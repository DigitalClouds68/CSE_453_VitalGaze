const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "邮箱是必需的"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "请输入有效的邮箱地址"],
    },
    username: { type: String, required: [true, "用户名是必需的"] },
    password: {
      type: String,
      required: [true, "密码是必需的"],
      minlength: [6, "密码长度必须至少6个字符"],
      maxlength: [20, "密码长度不能超过20个字符"],
    },
  },
  { timestamps: true }
);

// 在保存前加密密码
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // 如果密码没有修改，就跳过加密

  // 使用 bcrypt 加密密码
  try {
    this.password = await bcrypt.hash(this.password, 10); // 加密密码，盐值 10
    next();
  } catch (error) {
    next(error); // 如果加密失败，传递错误
  }
});

// 比较密码
UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password); // 比对加密后的密码
  } catch (error) {
    throw new Error("密码比对失败");
  }
};

module.exports = mongoose.model("User", UserSchema, "vitalgaze_users");
