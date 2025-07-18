import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import bookRoutes from './routes/book.route.js';
import categoryRoutes from './routes/category.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  });
