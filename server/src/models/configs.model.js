const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConfigsSchema = new Schema(
  {
    page_name: {
      type: String,
      required: true,
    },
    logo_url: {
      type: String,
      required: true,
    },
    banner_url: {
      type: String,
      required: true,
    },
    sub_banner: [
      {
        type: String,
      },
    ],
    copyright: {
      type: String,
    },
    facebook: {
      type: String,
    },
    email: {
      type: String,
    },
    youtube: {
      type: String,
    },
    address: {
      type: String,
    },
    hotline: {
      type: String,
    },
    slogan: {
      type: String,
    },
  },
  {
    collection: "configs",
    timestamps: true,
  }
);

module.exports = mongoose.model("config_model", ConfigsSchema);
