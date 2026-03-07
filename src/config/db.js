import mongoose from "mongoose";
// Setting a public DNS Server to use
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error); 
    process.exit(1);
  }
};

export default connectDB;