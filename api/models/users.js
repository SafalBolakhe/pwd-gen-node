const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    loginusername: {
      type: String,
      required: true,
      unique: true,
    },
    loginpassword: {
      type: String,
      required: true,
      unique: false,
    },
    profilePicture: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
