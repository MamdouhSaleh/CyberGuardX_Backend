import { User } from "../models/user.model.js";

export const registerUser = async (email, password) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = new User({ email, password });
  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }
  return user;
};
