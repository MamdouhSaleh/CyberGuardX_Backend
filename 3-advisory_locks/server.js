import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis();

await mongoose.connect('mongodb://localhost:27017/advisory-lock-demo');

const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number
});

const Account = mongoose.model('Account', accountSchema);

await Account.deleteMany({});
await Account.create([{ name: 'Alice', balance: 1000 }, { name: 'Bob', balance: 1000 }]);
console.log('Seeded accounts');

const acquireLock = async (key, ttl = 3000) => {
  const result = await redis.set(key, 'locked', 'NX', 'PX', ttl);
  return result === 'OK';
};

const releaseLock = async (key) => {
  await redis.del(key);
};

app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  const lockKey = `lock:account:${from}`;

  const acquired = await acquireLock(lockKey, 3000);
  if (!acquired) return res.status(423).send('Resource is locked');

  try {
    const sender = await Account.findOne({ name: from });
    const receiver = await Account.findOne({ name: to });

    if (!sender || !receiver) return res.status(400).send('Invalid account');
    if (sender.balance < amount) return res.status(400).send('Insufficient funds');

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.send('Transfer completed');
  } finally {
    await releaseLock(lockKey);
  }
});

app.post('/reset', async (req, res) => {
  await Account.deleteMany({});
  await Account.create([{ name: 'Alice', balance: 1000 }, { name: 'Bob', balance: 1000 }]);
  res.send('Accounts reset');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
