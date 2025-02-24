/* 用来存用户信息 */
/*      
        步骤：
        1.用户登录
        2.服务器检查 User.js 里的账号密码是否正确
        3.登录成功后，返回 user_id
*/
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  /*
  // Password length must be at least 6 characters
  if (this.password.length < 6) {
    throw new Error("Password length must be at least 6 characters");
  }
  // Password length must be at most 20 characters
  if (this.password.length > 20) {
    throw new Error("Password length must be at most 20 characters");
  }
  */
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema, "vitalgaze_users");