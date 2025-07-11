import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signup = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  return user;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect Username or password");

  const { password: _, ...safeUser } = user.toObject();
  return safeUser; 
};
