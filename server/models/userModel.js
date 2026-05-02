import mongoose from "mongoose";

// User Schema
// cartData stores items as { productId_size: quantity }
// e.g. { "abc123_M": 2, "xyz456_L": 1 }
const userSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true,
  },
  email: {
    type:     String,
    required: true,
    unique:   true,
  },
  password: {
    type:     String,
    required: true,
  },
  cartData: {
    type:    Object,
    default: {},
  },
}, {
  minimize: false, // keeps empty objects in DB
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;