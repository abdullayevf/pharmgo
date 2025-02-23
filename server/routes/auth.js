import { Router } from "express";
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js"

dotenv.config(); // Load environment variables

// Register

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate password length
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({
        error: "Parol kamida 6 belgidan, ko'pida 20 tashkil topishi kerak.",
      });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPass,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const accessToken = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return success response
    res.json({
      status: "ok",
      msg: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
      token: accessToken,
    });
  } catch (error) {
    console.log(error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        error: "Validatsiya xatosi.",
        errors,
      });
    }

    // Handle duplicate key error (e.g., unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Username yoki email allaqachon mavjud",
      });
    }

    // Handle other errors
    res.status(500).json({
      error: "Server xatosi. Iltimos, keyinroq urinib ko'ring.",
    });
  }
});

// Login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // If the user is not found on the database
    if (!user)
      return res.status(400).json({
        error: "Foydalanuvchi topilmadi.",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({
        error: "Noto'g'ri parol.",
      });

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: "ok",
      msg: "Muvaffaiyatli tizimga kirdingiz!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server xatosi. Iltimos, keyinroq urinib ko'ring.",
    });
  }
});

// Protected route trial

router.get("/profile", authMiddleware, (req, res) => {
  res.json({msg: "Welcome to your profile, sir", user: req.user})
}) 

export default router;
