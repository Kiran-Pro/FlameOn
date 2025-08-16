import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // parse JSON body

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ DB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// Import product routes
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
