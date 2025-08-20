import express from "express";
import protect from "../middleware/profileAuth.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ message: "Profile accessed granted", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
