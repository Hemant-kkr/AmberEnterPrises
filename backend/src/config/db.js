import mongoose from "mongoose";

async function connectDB() {
  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("MongoDB connected For Amber Safety");
  } catch (error) {
    console.log("ERROR", error);
    process.exit(1);
  }
}

export default connectDB;