import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import firebaseRoutes from "./routes/firebaseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // parse JSON body

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// Routes

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/firebase-auth", firebaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
