import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyStripe,
  verifyRazorpay,
  userOrders,
  allOrders,
  updateStatus,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ── Admin Routes ──────────────────────────────────────────────
orderRouter.post("/list",   adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// ── Payment Routes (user authenticated) ──────────────────────
orderRouter.post("/place",         authUser, placeOrder);
orderRouter.post("/stripe",        authUser, placeOrderStripe);
orderRouter.post("/razorpay",      authUser, placeOrderRazorpay);

// ── Payment Verification ──────────────────────────────────────
orderRouter.post("/verifyStripe",   authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

// ── User Order History ────────────────────────────────────────
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;