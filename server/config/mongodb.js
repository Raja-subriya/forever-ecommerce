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

    // Mask URI for logging (hide password)
    const maskedUri = uri.replace(/\/\/(.*):(.*)@/, "//***:***@");
    console.log("Attempting to connect to MongoDB:", maskedUri);

    // Connect with a slightly longer timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds (better for slow connections)
      family: 4 
    });
    
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    // If connection fails, queries will timeout. 
    // We should probably inform the app state if we were in a larger framework.
  }
};

export default connectDB;