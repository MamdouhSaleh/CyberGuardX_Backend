import express from 'express';
import { apiLimiter } from './rate_limiter.js';

const app = express();
    let count = 0;


app.use('/api/', apiLimiter); 

app.get('/api/data', (req, res) => {
    count++;
    console.log(`Request count: ${count}`);
    console.log(req.ip);
    console.log(res.statusCode); 
  res.json({ message: 'This is your data!', 
             requestCount: count });
});

app.listen(3000, () => console.log('Server running on port 3000'));
