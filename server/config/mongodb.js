import mongoose from "mongoose";

// Connects to MongoDB Atlas using the URI from .env
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected Successfully");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("Make sure your MONGODB_URI is a cloud URL (Atlas), not localhost!");
  }
};

export default connectDB;