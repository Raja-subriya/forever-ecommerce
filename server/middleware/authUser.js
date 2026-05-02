import jwt from "jsonwebtoken";

// Protects user routes — verifies JWT from Authorization header
// Adds userId to req.body for downstream controllers
const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach userId so controllers know who is making the request
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;