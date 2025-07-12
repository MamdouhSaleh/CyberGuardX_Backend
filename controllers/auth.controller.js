import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const signup = async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created', user: { name, email } });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed', details: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const changeUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  if (!['user', 'admin'].includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = newRole;
    await user.save();

    res.json({ message: `User role updated to ${newRole}`, user: { id: user._id, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user role', error: err.message });
  }
};

export const getDashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.name} to your dashboard` });
};

export const getAdminPanel = (req, res) => {
  res.json({ message: 'Welcome admin to the control panel' });
};