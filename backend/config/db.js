import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/desert_journey_dxb";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🍃 MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn(`👉 Please make sure MongoDB is running locally or provide a valid MONGODB_URI in backend/.env`);
    // Do not crash the entire process immediately so error messages can be returned gracefully
  }
}

export default connectDB;
