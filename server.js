import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/transaction_demo';

await mongoose.connect(uri);

const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number
});

const transactionLogSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Account = mongoose.model('Account', accountSchema);
const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);

await Account.deleteMany({});
await TransactionLog.deleteMany({});

await Account.insertMany([
  { name: 'Alice', balance: 1000 },
  { name: 'Bob', balance: 500 }
]);

console.log('Seeded accounts.');

async function transferMoney({ from, to, amount}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await Account.findOne({ name: from }).session(session);
    const receiver = await Account.findOne({ name: to }).session(session);

    if (!sender || !receiver) throw new Error('Invalid account');

    if (sender.balance < amount) throw new Error('Insufficient funds');

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    await TransactionLog.create([{ from, to, amount }], { session });

    await session.commitTransaction();
    console.log('Transaction committed');
  } catch (err) {
    await session.abortTransaction();
    console.error('Transaction aborted:', err.message);
  } finally {
    session.endSession();
  }
}

console.log('\n--- Successful Transfer ---');
await transferMoney({ from: 'Alice', to: 'Bob', amount: 200 });

console.log('\n--- Failing Transfer (Insufficient Funds) ---');
await transferMoney({ from: 'Alice', to: 'Bob', amount: 5000 });


console.log('\nFinal balances:');
console.log(await Account.find().lean());
console.log('\nTransaction Logs:');
console.log(await TransactionLog.find().lean());

await mongoose.disconnect();
