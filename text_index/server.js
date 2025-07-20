import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const uri = 'mongodb://localhost:27017/text_index';
await mongoose.connect(uri);

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

// articleSchema.index({ title: 'text', content: 'text' });


const Article = mongoose.model('Article', articleSchema);


await Article.deleteMany({});

const articles = Array.from({ length: 10000 }, () => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),

}));

articles.push({ title: 'Science in the 21st Century',
                content: 'The advancements in science have been remarkable, especially in fields like AI, biotechnology, and space exploration.' });

console.time('Insert Articles');
await Article.insertMany(articles);
console.timeEnd('Insert Articles');

console.time('Find (No Index)');
console.log(await Article.find({ content: /science/i }));
console.timeEnd('Find (No Index)');

await Article.collection.createIndex({ title: 'text', content: 'text' });

console.time('Find (With Text Index)');
console.log( await Article.find({ $text: { $search: 'science' } }));
console.timeEnd('Find (With Text Index)');


await mongoose.disconnect();
