// lib/mongodb.js
import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://sd10072004:somesh123@cluster0.fpxvqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB"); 
  } catch (error) {
    console.log("Error  : ",error);
  }
};

export default connectDB;