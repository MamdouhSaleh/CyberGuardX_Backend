import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb://localhost:27017/occ_demo';

await mongoose.connect(MONGO_URI);
console.log('Connected to MongoDB');

const stockSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
}, {
  optimisticConcurrency: true 
});

const StockItem = mongoose.model('StockItem', stockSchema);

await StockItem.deleteMany({});
await StockItem.create({ name: 'Product A', quantity: 100 });
console.log('Seeded stock item');

async function sellItemOCC(itemId, amount) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const item = await StockItem.findById(itemId);
      if (!item) return console.log('Item not found');

      if (item.quantity < amount) {
        return console.log(`Not enough stock to sell ${amount}`);
      }

      item.quantity -= amount;
      const saved = await item.save(); 
      return console.log(`Attempt ${attempt}: Sold ${amount}. Remaining: ${saved.quantity}`);
    } catch (err) {
      if (err.name === 'VersionError') {
        console.log(`OCC Conflict on attempt ${attempt}. Retrying...`);
      } else {
        console.log(`Unexpected error:`, err.message);
        break;
      }
    }
  }

  console.log(`Failed to sell ${amount} after 3 retries.`);
}

async function simulateConcurrentSales() {
  const item = await StockItem.findOne({ name: 'Product A' });

  await Promise.all([
    sellItemOCC(item._id, 30),
    sellItemOCC(item._id, 50),
    sellItemOCC(item._id, 40), 
  ]);

  const final = await StockItem.findById(item._id);
  console.log(`🔍 Final quantity: ${final.quantity}`);
}

app.listen(3000, async () => {
  console.log('Server running on http://localhost:3000');
  await simulateConcurrentSales();
});
