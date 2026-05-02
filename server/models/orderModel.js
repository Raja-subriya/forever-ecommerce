import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type:     String,
    required: true,
  },
  // Array of cart items: [{ _id, name, price, image, size, quantity }]
  items: {
    type:     Array,
    required: true,
  },
  amount: {
    type:     Number,
    required: true,
  },
  // Shipping address
  address: {
    type:     Object,
    required: true,
  },
  // Order Status: Order Placed | Packing | Shipped | Out for delivery | Delivered
  status: {
    type:    String,
    default: "Order Placed",
  },
  // COD | Stripe | Razorpay
  paymentMethod: {
    type:     String,
    required: true,
  },
  // false until payment confirmed (COD is always false until delivered)
  payment: {
    type:    Boolean,
    default: false,
  },
  date: {
    type:    Number,         // timestamp
    required: true,
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;