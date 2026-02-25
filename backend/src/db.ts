import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully ");
  } catch (error) {
    console.error("MongoDB connection failed ");
    console.error(error);
    
  }
};

connectDB();

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model("User", UserSchema);