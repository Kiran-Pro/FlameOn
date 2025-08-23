import express from "express";
import bcrypt from "bcryptjs";
import protect from "../middleware/profileAuth.js";
import User from "../models/user.js";

const router = express.Router();

// Update account details
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Update password
router.put("/update-password", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword } = req.body;

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "✅ Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
