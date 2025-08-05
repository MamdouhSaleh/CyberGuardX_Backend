import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import User from '../models/user.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth API', () => {

  test("debug test", async () => {
    await User.create({ email: "x@test.com", password: "123" });
    const users = await User.find();
    expect(users.length).toBe(1);
    console.log(users);
  });
  
  test('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered');
  });

  test('should not register duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email already registered');
  });

  test('should login with correct credentials', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('should reject login with wrong password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
