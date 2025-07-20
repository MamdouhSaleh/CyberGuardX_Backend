import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/aggregation-example';
await mongoose.connect(uri);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

await Product.deleteMany();

await Product.insertMany([
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 800 },
  { name: 'Tablet', price: 600 },
  { name: 'Monitor', price: 300 },
  { name: 'Keyboard', price: 100 },
  { name: 'Mouse', price: 50 },
  { name: 'Printer', price: 400 },
  { name: 'Speaker', price: 200 },
  { name: 'Webcam', price: 150 },
  { name: 'Microphone', price: 250 }
]);

const result = await Product.aggregate([
  { $sort: { price: -1 } },
  { $skip: 5 },
  { $limit: 5 }
]);

console.log('Products after skipping top 5 expensive ones:');
console.log(result);

await mongoose.disconnect();


