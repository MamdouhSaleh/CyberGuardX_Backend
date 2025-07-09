import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/product.route.js'; 

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the product router for all routes starting with /api/products
app.use('/api/products', productRouter);

mongoose.connect('mongodb://localhost:27017/cyberguardx').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
});
