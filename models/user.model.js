import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String
});

export const User = mongoose.model('User', userSchema);
