import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = express.Router();

// Gmail transporter (using App Password)
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}
console.log("📧 Using Gmail account:", process.env.EMAIL_USER);

// REGISTER
// Create user with isVerified=false and send OTP
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create unverified user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    newUser.otpCode = otpCode;
    newUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await newUser.save();

    // Send OTP email
    await getTransporter().sendMail({
      from: `"FlameOn Support" <no-reply@flameon.com>`,
      to: newUser.email,
      subject: "Verify your FlameOn account",
      html: `
        <h2>Welcome ${newUser.name}!</h2>
        <p>Your OTP code is: <b>${otpCode}</b></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    res.json({
      message: "OTP sent to your email. Verify to activate account.",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// VERIFY OTP
// Confirms OTP and activates account
// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.json({ message: "Already verified. Please login." });

    if (user.otpCode !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Account verified successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// RESEND OTP – if user didn't get or expired
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // New OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send email
    await getTransporter().sendMail({
      from: `"FlameOn Support" <no-reply@flameon.com>`,
      to: user.email,
      subject: "New OTP for your FlameOn account",
      html: `
        <h2>Hello ${user.name},</h2>
        <p>Your new OTP code is: <b>${otpCode}</b></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    res.json({ message: "A new OTP has been sent to your email." });
  } catch (err) {
    console.error("🔥 Resend OTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN – only for verified users
// LOGIN – only for verified users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your account before logging in." });
    }

    const passMatches = await bcrypt.compare(password, user.password);
    if (!passMatches)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// FORGOT PASSWORD – sends reset link
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = getTransporter();
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res
        .status(400)
        .json({ message: "Password reset not available for this account" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"FlameOn Support" <no-reply@flameon.com>`,
      replyTo: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Hello ${user.name || "User"},</h2>
        <p>You requested a password reset. Click below:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid account for reset" });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password has been reset successfully!" });
  } catch (err) {
    console.error("🔥 Reset password error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;
