import jwt from "jsonwebtoken";

// Protects admin routes — verifies admin JWT token
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Admin login required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin token payload is the email+password combo string
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized. Admin login required." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;