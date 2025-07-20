import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/ttl_index';
await mongoose.connect(uri);

const tempDataSchema = new mongoose.Schema({
  data: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 10 } 
  }
});

const TempData = mongoose.model('TempData', tempDataSchema);

// await TempData.collection.createIndex(
//   { createdAt: 1 },
//   { expireAfterSeconds: 10 }
// );

await TempData.deleteMany({});
console.log('Inserting temporary data...');

console.log('Inserted. Waiting 61 seconds...', await TempData.create({ data: 'This will disappear in 61 seconds' }));

await new Promise(resolve => setTimeout(resolve, 61000));

const results = await TempData.find({});
console.log('Results after 61 seconds:', results);

await mongoose.disconnect();
