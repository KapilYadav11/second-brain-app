import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UserModel } from "./db.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    console.log("Signup route hit");
console.log(req.body);
  try {
    const signupSchema = z.object({
      username: z.string().email(),
      password: z.string().min(3),
    });

    const { username, password } = signupSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      password: hashPassword,
    });

    return res.json({
      message: "User signup successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
});



app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({
      username,
    });
    if (!existingUser || !existingUser.password) {
      return res.status(403).json({
        message: "Incorrecyt credentails",
      });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!comparePassword) {
      return res.status(403).json({
        message: "Incorrect Credentials",
      });
    }

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not defined in environment");
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_KEY,
    );

    res.json({
      token,
      message: "User signin successfully!!"
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
