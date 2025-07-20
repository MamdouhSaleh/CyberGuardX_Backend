import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost:27017/products-aggregation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

await Product.deleteMany({});

await Product.insertMany([
  { name: 'Laptop', price: 1200 },
  { name: 'Smartphone', price: 800 },
  { name: 'Monitor', price: 300 },
  { name: 'Headphones', price: 150 },
  { name: 'Keyboard', price: 100 },
  { name: 'Tablet', price: 400 },
  { name: 'Smartwatch', price: 250 },
  { name: 'Desk Lamp', price: 60 },
  { name: 'Camera', price: 900 },
]);

// Aggregation: sort by price descending and limit to top 5
const topProducts = await Product.aggregate([
  { $sort: { price: -1 } },
  { $limit: 5 }
]);

console.log('Top 5 Most Expensive Products:');
console.log(topProducts);

// Close the connection
await mongoose.disconnect();
