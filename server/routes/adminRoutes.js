import express from "express";
import Product from "../models/product.js";
import Order from "../models/Order.js";
import User from "../models/user.js";
import protect from "../middleware/profileAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

//USER MANAGEMENT

// Get all users
router.get("/users", protect, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t expose password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// Make user admin
router.put("/users/:id/make-admin", protect, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
});

// Remove admin role
router.put("/users/:id/remove-admin", protect, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = false;
    await user.save();

    res.json({ message: "Admin role removed", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
});

// ORDER MANAGEMENT

// Get all orders
router.get("/orders", protect, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// Update order status
router.put("/orders/:id/status", protect, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
});

// PRODUCT MANAGEMENT

// Add a product
router.post("/products", protect, adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
});

// Update product
router.put("/products/:id", protect, adminAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
});

// Delete product
router.delete("/products/:id", protect, adminAuth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

export default router;
