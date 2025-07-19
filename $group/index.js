import mongoose from "mongoose";

const dbURI = "mongodb://localhost:27017/groupByCustomer";
mongoose.connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const orderSchema = new mongoose.Schema({
  customer: String,
  total: Number,
  items: Number,
  product: String
},
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

const orders = [
  { customer: "Alice", total: 50, items: 3, product: "Book" },
  { customer: "Alice", total: 30, items: 1, product: "Pen" },
  { customer: "Bob", total: 100, items: 4, product: "Notebook" },
  { customer: "Alice", total: 70, items: 2, product: "Book" },
  { customer: "Bob", total: 20, items: 1, product: "Pen" }
];
await Order.deleteMany({})
  .then(() => console.log("Old orders deleted"))
  .catch(err => console.error("Error deleting old orders:", err));

await Order.insertMany(orders)
console.log("Orders inserted")

const result = await Order.aggregate([
  {
    $group: {
      _id: "$customer",
      totalSpent: { $sum: "$total" },
      avgItems: { $avg: "$items" },
      minOrder: { $min: "$total" },
      maxOrder: { $max: "$total" },
      firstProduct: { $first: "$product" },
      lastProduct: { $last: "$product" },
      allProducts: { $push: "$product" },
      uniqueProducts: { $addToSet: "$product" }
    }
  }
])


console.log("Aggregation result:", JSON.stringify(result, null, 2));


