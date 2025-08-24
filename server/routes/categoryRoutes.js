import express from "express";
import Category from "../models/category.js";
import protect from "../middleware/profileAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
});

// Add category
router.post("/", protect, adminAuth, async (req, res) => {
  try {
    const cat = await Category.create({ name: req.body.name });
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ message: "Failed to add category", error });
  }
});

// Delete category
router.delete("/:id", protect, adminAuth, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
});

export default router;
