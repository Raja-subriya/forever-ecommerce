import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

// All cart routes require a valid user JWT token
// POST /api/cart/add    → add item to cart
// POST /api/cart/update → update item quantity
// POST /api/cart/get    → get user's cart
cartRouter.post("/add",    authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get",    authUser, getUserCart);

export default cartRouter;