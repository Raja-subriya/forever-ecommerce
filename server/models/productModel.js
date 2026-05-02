import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true,
  },
  description: {
    type:     String,
    required: true,
  },
  price: {
    type:     Number,
    required: true,
  },
  // Array of Cloudinary image URLs (up to 4 images)
  image: {
    type: Array,
    required: true,
  },
  // men | women | kids
  category: {
    type:     String,
    required: true,
  },
  // Topwear | Bottomwear | Winterwear
  subCategory: {
    type:     String,
    required: true,
  },
  // Available sizes e.g. ["S","M","L","XL","XXL"]
  sizes: {
    type: Array,
    required: true,
  },
  // Available colors e.g. ["Black","Blue"]
  colors: {
    type: Array,
    default: [],
  },
  bestseller: {
    type:    Boolean,
    default: false,
  },
  date: {
    type:    Number,         // timestamp for sorting by latest
    required: true,
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;