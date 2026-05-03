import mongoose from "mongoose";
import "dotenv/config";

const testConnection = async () => {
  const uri = "mongodb+srv://raja:1xYxGTGqZ2RWyRfw@rajasubriya.cnaqe7g.mongodb.net/?retryWrites=true&w=majority&appName=rajasubriya";
  console.log("Testing connection to:", uri.replace(/\/\/(.*):(.*)@/, "//***:***@"));
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ SUCCESS: Connected to MongoDB!");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections found:", collections.map(c => c.name));
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ FAILURE:", error.message);
  }
};

testConnection();
