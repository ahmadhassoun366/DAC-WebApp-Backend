import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;
export default async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB database successfully!");
  } catch (error) {
    console.error("Error in MongoDB connection: " + error);
    process.exit(1); // Exit process with failure
  }
}
