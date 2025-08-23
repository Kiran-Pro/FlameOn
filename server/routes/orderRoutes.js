import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/profileAuth.js";

const router = express.Router();

// Create a new order (protected)
router.post("/", protect, async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      userId: req.user.id,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get logged-in user's orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
