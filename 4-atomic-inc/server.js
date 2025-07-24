import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb://localhost:27017/atomic_demo';
await mongoose.connect(MONGO_URI);
console.log('Connected to MongoDB');

const stockSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const StockItem = mongoose.model('StockItem', stockSchema);

await StockItem.deleteMany({});
await StockItem.create({ name: 'Product A', quantity: 100 });
console.log('Seeded stock item');

async function sellItemAtomic(itemId, amount) {
  const updated = await StockItem.findOneAndUpdate(
    { _id: itemId, quantity: { $gte: amount } }, 
    { $inc: { quantity: -amount } },
    { new: true }
  );

  if (updated) {
    console.log(`Sold ${amount} units. Remaining: ${updated.quantity}`);
  } else {
    console.log(`Not enough stock to sell ${amount} units`);
  }
}

async function simulateConcurrentSales() {
  const item = await StockItem.findOne({ name: 'Product A' });

  await Promise.all([
    sellItemAtomic(item._id, 30),
    sellItemAtomic(item._id, 50),
    sellItemAtomic(item._id, 40), 
  ]);

  const final = await StockItem.findById(item._id);
  console.log(`Final quantity: ${final.quantity}`);
}

app.listen(3000, async () => {
  console.log('Server running on http://localhost:3000');
  await simulateConcurrentSales();
});




