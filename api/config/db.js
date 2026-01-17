// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected:", mongoose.connection.host);
    console.log("Mongo DB NAME:", mongoose.connection.name);   // 👈 ADD THIS

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;


