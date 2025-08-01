import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ids', async (req, res) => {
  try {
    const result = await pool.query('SELECT id FROM testtable');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});