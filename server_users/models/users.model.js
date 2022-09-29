const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  { timestamps: true }
);
UserSchema.methods.getResetPasswordToken = function () {
  //! tạo mã thông báo
  const resetToken = HELPER.resetTokens();

  //! Thêm resetPasswordToken vào userSchema
  this.resetPasswordToken = HELPER.resetPasswordToken(resetToken);

  this.resetPasswordExpire = Date.now() + CONSTANTS._15_MINUTES;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
