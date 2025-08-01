import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: process.env.SSL_REJECT_UNAUTHORIZED === 'true'
  }
});

export default pool;

// CREATE DATABASE test;

// CREATE TABLE testtable (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
