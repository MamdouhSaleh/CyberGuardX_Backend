import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth.route.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions', 
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: false,
    sameSite: 'lax',
  }
}));

app.use("/api/auth", authRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is your profile", user: req.session.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
