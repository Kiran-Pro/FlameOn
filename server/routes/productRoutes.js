import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // fetch from MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // fetch by Mongo ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/products/seed
router.post("/seed", async (req, res) => {
  try {
    const data = req.body; // expects array of products
    const products = await Product.insertMany(data);

    res.status(201).json({
      message: "Products seeded successfully",
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed", error: err.message });
  }
});

export default router;
