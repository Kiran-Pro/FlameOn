import express from "express";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import User from "../models/user.js";

const router = express.Router();

function initFirebaseAdmin() {
  if (!admin.apps.length) {
    const serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    };

    if (
      !serviceAccount.project_id ||
      !serviceAccount.client_email ||
      !serviceAccount.private_key
    ) {
      console.error("Missing envs. Cannot initialize Firebase Admin.");
      return false;
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin initialized");
  }
  return true;
}

// POST /firebase-auth/login
router.post("/login", async (req, res) => {
  const { token } = req.body;
  console.log("Incoming token:", token ? token.slice(0, 20) + "..." : "none");

  try {
    if (!initFirebaseAdmin()) {
      return res
        .status(500)
        .json({ message: "Firebase Admin not initialized" });
    }

    // Verify the Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("Firebase token verified for:", decoded.email);

    // Find or create the user in MongoDB
    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      console.log("Creating new user for:", decoded.email);
      user = await User.create({
        name: decoded.name || "New User",
        email: decoded.email,
        password: "", // no password for Firebase users
        isVerified: true, // firebase users are trusted
      });
    }

    // Issue JWT token
    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
      token: appToken,
    });
  } catch (err) {
    console.error("Firebase login error:", err);
    res.status(401).json({
      message: err.message || "Invalid Firebase token",
      code: err.code || null,
    });
  }
});

export default router;
