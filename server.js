import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import authRoutes from './routes/auth.route.js';
import { User } from './models/user.model.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error('DB Connection Error:', err));

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isVerified) return next(new Error("Unauthorized"));
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

import { Message } from './models/message.model.js';

io.on('connection', async (socket) => {
  console.log(`${socket.user.name} connected`);

  const recentMessages = await Message.find()
    .sort({ timestamp: 1 })
    .limit(50)
    .populate('sender', 'name');

  socket.emit('chat:history', recentMessages.map(msg => ({
    user: msg.sender.name,
    msg: msg.content,
    timestamp: msg.timestamp
  })));

  socket.on('chat:message', async (msg) => {
    const savedMsg = await Message.create({
      sender: socket.user._id,
      content: msg,
      timestamp: new Date().getTime()
    });

    io.emit('chat:message', {
      user: socket.user.name,
      msg,
      timestamp: savedMsg.timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.user.name} disconnected`);
  });
});
