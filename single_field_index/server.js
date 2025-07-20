import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const uri = 'mongodb://localhost:27017/index_test';
await mongoose.connect(uri);

const userSchema = new mongoose.Schema({
  email: String,
  name: String
  //email: { type: String, index: true }
});

const User = mongoose.model('User', userSchema);

console.time('Clean & Insert');
await User.deleteMany({});

const users = Array.from({ length: 1000000 }, () => ({
  email: faker.internet.email(),
  name: faker.person.fullName()
}));

users.push({ email: 'test@example.com', name: 'Special User' });

await User.deleteMany({});
console.time('Insert Many');
await User.insertMany(users);
console.timeEnd('Insert Many');

console.time('No Index Query');
await User.findOne({ email: 'test@example.com' });
console.timeEnd('No Index Query');

await User.collection.createIndex({ email: 1 });

console.time('Indexed Query');
await User.findOne({ email: 'test@example.com' });
console.timeEnd('Indexed Query');

process.exit();
