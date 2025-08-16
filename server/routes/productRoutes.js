import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

export default router;
