import express from 'express';
import mongoose from 'mongoose';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});
const User = mongoose.model('User', userSchema);

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'MongoDB error', details: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'MongoDB error', details: err.message });
  }
});

const BOOKS_TABLE = 'Books';
const TOC_TABLE = 'TOC';
const PAGES_TABLE = 'Pages';

app.post('/books', async (req, res) => {
  const book = {
    bookId: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    chapter: req.body.chapter
  };

  try {
    await dynamoDb.put({
      TableName: BOOKS_TABLE,
      Item: book
    }).promise();

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'DynamoDB error', details: err.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const data = await dynamoDb.scan({ TableName: BOOKS_TABLE }).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: 'DynamoDB error', details: err.message });
  }
});

app.post('/toc', async (req, res) => {
  const toc = {
    tocId: Date.now().toString(),
    bookId: req.body.bookId,
    title: req.body.title
  };

  try {
    await dynamoDb.put({
      TableName: TOC_TABLE,
      Item: toc
    }).promise();

    res.json(toc);
  } catch (err) {
    res.status(500).json({ error: 'DynamoDB error', details: err.message });
  }
});

app.post('/pages', async (req, res) => {
  const page = {
    pageId: Date.now().toString(),
    bookId: req.body.bookId,
    content: req.body.content
  };

  try {
    await dynamoDb.put({
      TableName: PAGES_TABLE,
      Item: page
    }).promise();

    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'DynamoDB error', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
