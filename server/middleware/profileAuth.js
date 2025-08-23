import jwt from "jsonwebtoken";
import admin from "firebase-admin";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No Token Available" });
  }

  const token = authHeader.split(" ")[1];

  try {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id, source: "app-jwt" };
      return next();
    } catch (err) {}

    const decodedFirebase = await admin.auth().verifyIdToken(token);
    req.user = {
      id: decodedFirebase.uid,
      email: decodedFirebase.email,
      source: "firebase",
    };
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;
