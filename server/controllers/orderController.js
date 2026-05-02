import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

const DELIVERY_CHARGE = 10;

// ── Lazy-initialize payment gateways ─────────────────────────
// Only create instances when a payment route is actually called.
// This means missing .env keys do NOT crash the server on startup.
let stripeInstance   = null;
let razorpayInstance = null;

const getStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY missing in .env");
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

const getRazorpay = () => {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
      throw new Error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET missing in .env");
    razorpayInstance = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
};

const clearCart = async (userId) => {
  await userModel.findByIdAndUpdate(userId, { cartData: {} });
};

// ── COD ───────────────────────────────────────────────────────
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId, items, address, amount,
      paymentMethod: "COD", payment: false, date: Date.now(),
    });
    await newOrder.save();
    await clearCart(userId);
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Stripe ────────────────────────────────────────────────────
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const newOrder = new orderModel({
      userId, items, address, amount,
      paymentMethod: "Stripe", payment: false, date: Date.now(),
    });
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: DELIVERY_CHARGE * 100,
      },
      quantity: 1,
    });

    const session = await getStripe().checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await clearCart(userId);
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Razorpay ──────────────────────────────────────────────────
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId, items, address, amount,
      paymentMethod: "Razorpay", payment: false, date: Date.now(),
    });
    await newOrder.save();

    const order = await getRazorpay().orders.create({
      amount:   amount * 100,
      currency: "INR",
      receipt:  newOrder._id.toString(),
    });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await getRazorpay().orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await clearCart(userId);
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── User & Admin ──────────────────────────────────────────────
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder, placeOrderStripe, verifyStripe,
  placeOrderRazorpay, verifyRazorpay,
  userOrders, allOrders, updateStatus,
};