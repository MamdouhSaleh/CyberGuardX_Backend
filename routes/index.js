import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Winston Logger App!' });
});

router.get('/error', (req, res) => {
  throw new Error('Simulated error for logging');
});

export default router;
