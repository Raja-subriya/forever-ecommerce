import mongoose from "mongoose";

// Connects to MongoDB Atlas using the URI from .env
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;