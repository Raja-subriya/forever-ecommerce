import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ── Route: POST /api/product/add ─────────────────────────────
// Admin only. Uploads up to 4 images to Cloudinary, saves product to DB.
const addProduct = async (req, res) => {
  try {
    const {
      name, description, price,
      category, subCategory, sizes, colors, bestseller,
    } = req.body;

    // req.files comes from multer — up to 4 image fields
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Filter out undefined (user may upload fewer than 4)
    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload each image to Cloudinary and get back the secure URL
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price:       Number(price),
      subCategory,
      bestseller:  bestseller === "true" ? true : false,
      sizes:       JSON.parse(sizes),  // sent as JSON string from form
      colors:      colors ? JSON.parse(colors) : [],
      image:       imagesUrl,
      date:        Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Route: GET /api/product/list ─────────────────────────────
// Public. Returns all products.
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Route: POST /api/product/remove ──────────────────────────
// Admin only. Deletes a product by ID.
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Route: POST /api/product/single ──────────────────────────
// Public. Returns a single product by ID.
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };