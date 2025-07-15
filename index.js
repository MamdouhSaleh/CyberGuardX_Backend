import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import countriesRouter from './country.route.js';
import seedCountriesRouter from './seed.route.js';
import mongoose from 'mongoose';

import paginate from 'express-paginate';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(paginate.middleware(10, 50));
app.use(express.json());
app.use('/api/countries', countriesRouter);
app.use('/api/seed', seedCountriesRouter);

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
