const mongoose = require("mongoose");
const {
  MALE,
  FEMALE,
  BISEXUAL,
  USER,
  ADMIN,
  SUPER,
} = require("../configs/constants");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    role: {
      type: Number,
      enum: [USER, ADMIN, SUPER],
      default: USER,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: [MALE, FEMALE, BISEXUAL],
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    avt_url: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("user_model", UserSchema);
