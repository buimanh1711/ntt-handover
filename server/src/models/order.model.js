const mongoose = require("mongoose");
const {
  COD,
  PAYPAL,
  DONE,
  PENDING,
  CONFIRMED,
} = require("../configs/constants");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    order_status: {
      type: String,
      enum: [DONE, PENDING, CONFIRMED],
      default: PENDING,
    },
    payment_type: {
      type: String,
      enum: [COD, PAYPAL],
      default: COD,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    exporter: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("order_model", OrderSchema);
