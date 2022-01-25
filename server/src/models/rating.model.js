const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 5,
    },
  },
  {
    collection: "ratings",
    timestamps: true,
  }
);

module.exports = mongoose.model("rating_model", RatingSchema);
