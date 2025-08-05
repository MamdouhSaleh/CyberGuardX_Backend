import User from '../models/user.model.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ token: 'fake-jwt-token' });
};

