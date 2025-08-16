import mongoose from "mongoose";

// Define how a Product looks in the database
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
});

// Create a model from the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
