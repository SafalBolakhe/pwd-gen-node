const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema(
  {
    passwordfor: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    whose: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Passwords", passwordSchema);
