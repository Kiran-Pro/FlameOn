import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  payment: { type: String, required: true },
  cookingInstructions: { type: String, default: "" },
  cart: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
