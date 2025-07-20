import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const uri = 'mongodb://localhost:27017/index_test_unique';
await mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    // email: { type: String, unique: true } 
    email: String,
    name: String
});

const User = mongoose.model('User', userSchema);

function generateUsers() {
    const emailSet = new Set();
    const users = [];

    while (users.length < 10000) {
        const email = faker.internet.email();
        if (!emailSet.has(email)) {
            emailSet.add(email);
            users.push({
                email,
                name: faker.person.fullName()
            });
        }
    }

    users.push({ email: users[9999].email, name: 'Duplicate User' });

    return users;
}

console.log('\n--- Inserting WITHOUT Unique Index ---');
await User.collection.dropIndexes();
await User.deleteMany({});
const usersNoIndex = generateUsers();

console.time('Insert Many (No Index)');
try {
    await User.create(usersNoIndex);
} catch (err) {
    console.error(`(No Index) Duplicate Error: ${err.message}`);
}
console.timeEnd('Insert Many (No Index)');

let duplicate = await User.find({ email: usersNoIndex[9999].email }).count() > 1 ? 'Yes' : 'No';

console.log('Duplicates:', duplicate);
console.log('Total Users:', await User.countDocuments());


console.log('\n--- Inserting WITH Unique Index ---');
await User.deleteMany({});
await User.collection.dropIndexes();
await User.collection.createIndex({ email: 1 }, { unique: true });

const usersWithIndex = generateUsers();

console.time('Insert Many (With Unique Index)');
try {
    await User.insertMany(usersWithIndex, { ordered: true });
} catch (err) {
    console.error(`(With Index) Duplicate Error: ${err.message}`);
}
console.timeEnd('Insert Many (With Unique Index)');

duplicate = await User.find({ email: usersNoIndex[9999].email }).count() > 1 ? 'Yes' : 'No';


console.log('Duplicates:', duplicate);
console.log('Total Users:', await User.countDocuments());


await mongoose.disconnect();
