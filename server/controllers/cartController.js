import userModel from "../models/userModel.js";

// Cart data structure stored in user document:
// cartData: { "productId_size": quantity, "productId_size": quantity }
// Example: { "abc123_M": 2, "xyz456_L": 1 }
// Using productId+size as key allows same product in different sizes

// ── Route: POST /api/cart/add ─────────────────────────────────
// Adds 1 unit of a product+size to the user's cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    // Build composite key: productId_size
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;       // increment existing size
      } else {
        cartData[itemId][size] = 1;        // add new size for existing product
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;          // brand new cart item
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Route: POST /api/cart/update ──────────────────────────────
// Sets a specific product+size quantity (used to increment or set to 0)
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ── Route: POST /api/cart/get ─────────────────────────────────
// Returns the full cartData object for the logged-in user
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };