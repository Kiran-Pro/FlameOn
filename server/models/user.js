import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: false, default: "" },
  isVerified: { type: Boolean, default: false },
  otpCode: String,
  otpExpires: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
