import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";
import redisClient from "./redisClient.js";
import { hashToken, generateAccessToken, generateRefreshToken } from "../helpers/auth.helper.js";

export const signup = async (name, email, password) => {
  email = email.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, refreshTokens: [] });
  await user.save();
  return user;
};

export const login = async (email, password) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect Username or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const hashedRefreshToken = hashToken(refreshToken);
  const sessionId = uuidv4();


  user.refreshTokens.push({ token: hashedRefreshToken, sessionId });
  await user.save();

  return { accessToken, refreshToken, sessionId, user };
};

export const refreshAccessToken = async (refreshToken, sessionId) => {
  if (!refreshToken || !sessionId) throw new Error("No refresh token or session ID provided");

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User not found");

  const hashedRefreshToken = hashToken(refreshToken);

  const sessionIdx = user.refreshTokens.findIndex(
    (rt) => rt.token === hashedRefreshToken && rt.sessionId === sessionId
  );
  if (sessionIdx === -1) throw new Error("Refresh token/session not recognized");

  user.refreshTokens.splice(sessionIdx, 1);

  const newRefreshToken = generateRefreshToken(user);
  const newHashedRefreshToken = hashToken(newRefreshToken);
  const newSessionId = uuidv4();
  user.refreshTokens.push({ token: newHashedRefreshToken, sessionId: newSessionId });
  await user.save();

  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken, sessionId: newSessionId };
};

export const logout = async (userId, accessToken, sessionId) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { refreshTokens: { sessionId } }
  });

  const decoded = jwt.decode(accessToken);
  const exp = decoded?.exp;
  if (exp) {
    const now = Math.floor(Date.now() / 1000);
    const ttl = exp - now;
    if (ttl > 0) {
      await redisClient.set(`bl_${accessToken}`, "1", { EX: ttl });
    }
  }
};
