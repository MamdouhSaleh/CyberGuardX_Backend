import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const uri = 'mongodb://localhost:27017/text_index';
await mongoose.connect(uri);

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    page: Number
});

// articleSchema.index({ title: 'text', content: 'text' });


const Article = mongoose.model('Article', articleSchema);


await Article.deleteMany({});

let count = 0;

const articles = Array.from({ length: 10000 }, () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    page: ++count

}));

articles.push({
    title: 'Science in the 21st Century',
    content: 'The advancements in science have been remarkable, especially in fields like AI, biotechnology, and space exploration.',
    page: ++count
});

articles.push({
    title: 'The Future of Science and Technology',
    content: 'With the rise of quantum computing and AI, the future of science and technology looks promising and challenging.',
    page: ++count
});

articles.push({
    title: 'Science and Society',
    content: 'The relationship between science and society is complex, with science influencing societal norms and vice versa.',
    page: ++count
});

articles.push({
    title: 'The Role of Science in Modern Life',
    content: 'Science plays a crucial role in modern life, impacting everything from healthcare to communication.',
    page: ++count
});

console.time('Insert Articles');
await Article.insertMany(articles);
console.timeEnd('Insert Articles');

console.time('Find (No Index)');
console.log(await Article.find({ content: /science/i }, { page: 1, _id: 0 }));
console.timeEnd('Find (No Index)');

await Article.collection.createIndex({ title: 'text', content: 'text' });

console.time('Find (With Text Index)');
// console.log(await Article.find({ $text: { $search: 'science' } }, { page: 1, _id: 0, score: { $meta: 'textScore' } }));
console.log(await Article.aggregate([
    { $match: { $text: { $search: 'science' } } },
    { $project: {page: 1, score: { $meta: 'textScore' } } },
    { $sort: { score: { $meta: 'textScore' } } }
]));
console.timeEnd('Find (With Text Index)');


await mongoose.disconnect();
