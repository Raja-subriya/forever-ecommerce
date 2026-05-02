import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// POST /api/product/add    → admin adds a new product (with up to 4 images)
// GET  /api/product/list   → public product listing
// POST /api/product/remove → admin removes a product
// POST /api/product/single → get one product by id
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list",     listProducts);
productRouter.post("/remove",  adminAuth, removeProduct);
productRouter.post("/single",  singleProduct);

export default productRouter;