import { json } from "express";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const products = [
  { name: "Book A", price: 20 },
  { name: "Book B", price: 10 },
  { name: "Book C", price: 30 },
];

const dbConnect = mongoose.connect("mongodb://localhost:27017/sort");

await Product.deleteMany({});
await Product.insertMany(products);

const sortedProducts = await Product.aggregate([
  { $sort: { price: -1 } }
]);

console.log("Sorted Products:", JSON.stringify(sortedProducts, null, 2));

