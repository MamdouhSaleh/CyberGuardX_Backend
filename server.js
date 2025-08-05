import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect('mongodb://localhost:27017/in-memory-test')
  .then(() => {
    app.listen(3000, () => console.log('Server running'));
  })
  .catch(err => console.error(err));
