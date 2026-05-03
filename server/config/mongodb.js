import mongoose from "mongoose";

// Connects to MongoDB Atlas
const connectDB = async () => {
  // Set connection options
  mongoose.set('strictQuery', false);

  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected Successfully to:", mongoose.connection.name);
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    // Connect with a timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      family: 4 // Force IPv4
    });
    
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    // Don't exit process, let server stay alive for debugging
  }
};

export default connectDB;