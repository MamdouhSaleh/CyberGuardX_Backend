import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const uri = 'mongodb://localhost:27017/index_test_compound';
await mongoose.connect(uri);

const userSchema = new mongoose.Schema({
  email: String,
  name: String
});

userSchema.index({ email: 1, name: 1 });

const User = mongoose.model('User', userSchema);

console.time('Clean & Insert');
await User.deleteMany({});

const users = Array.from({ length: 100000 }, () => ({
  email: faker.internet.email(),
  name: faker.person.fullName()
}));

users.push({ email: 'target@example.com', name: 'Target User' });

console.time('Insert Many');
await User.insertMany(users);
console.timeEnd('Insert Many');

await mongoose.connection.db.command({ dropIndexes: 'users', index: '*' });

console.time('Query Without Index');
await User.findOne({ email: 'target@example.com', name: 'Target User' });
console.timeEnd('Query Without Index');

await User.collection.createIndex({ email: 1, name: 1 });

console.time('Query With Compound Index');
await User.findOne({ email: 'target@example.com', name: 'Target User' });
console.timeEnd('Query With Compound Index');

process.exit();
