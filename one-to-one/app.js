import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from './models/user.model.js';
import Profile from './models/profile.model.js';

dotenv.config();
const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);

app.post('/create', async (req, res) => {
  const profile = await Profile.create({
    bio: 'Backend dev',
    avatar: 'avatar.jpg',
    social: { twitter: '@dev', github: 'github.com/dev' }
  });

  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    profile: profile._id
  });

  res.json({ user });
});

app.get('/user_with_profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('profile');
  res.json(user);
});

app.get('/user_without_profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
