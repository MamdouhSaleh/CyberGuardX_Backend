import redisClient from "../services/redisClient.js";
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing token" });

  const token = header.split(" ")[1];

  const isBlacklisted = await redisClient.get(`bl_${token}`);
  if (isBlacklisted) {
    return res.status(403).json({ message: "Token has been invalidated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
