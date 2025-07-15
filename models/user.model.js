import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: false },
  password: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String
});

export const User = mongoose.model('User', userSchema);
