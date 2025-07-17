import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
