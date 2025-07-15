import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import authRoutes from './routes/auth.route.js';
import { User } from './models/user.model.js';
import { Message } from './models/message.model.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error('DB Connection Error:', err));

const chatNamespace = io.of('/chatroom');

chatNamespace.use(async (socket, next) => {
  let token;

  const authHeader = socket.handshake.headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token && socket.handshake.auth?.token) {
    token = socket.handshake.auth.token;
  }

  if (!token) {
    return next(new Error('Missing token'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isVerified) {
      return next(new Error('Unauthorized'));
    }

    socket.user = user;
    next();
  } catch (err) {
    return next(new Error('Invalid token'));
  }
});

chatNamespace.on('connection', async (socket) => {
  console.log(`${socket.user.name} connected to /chatroom`);

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

    chatNamespace.emit('chat:message', {
      user: socket.user.name,
      msg,
      timestamp: savedMsg.timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.user.name} disconnected from /chatroom`);
  });
});
