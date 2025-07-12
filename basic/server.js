import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.config.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
