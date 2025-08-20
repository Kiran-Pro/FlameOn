import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

//Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //To check if a user already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  //Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //To create a new User

  const newUser = await User.create({ name, email, password: hashedPassword });

  //To create a jwt token

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ newUser, token });
});

//Login Route

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  //check if user exists

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //Check if password matches

  const passMatches = bcrypt.compare(password, user.password);

  if (!passMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //create a token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ user, token });
});

export default router;
