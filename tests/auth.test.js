import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/auth.service.js', () => ({
  registerUser: jest.fn(),
}));

const authService = await import('../services/auth.service.js');
const { register } = await import('../controllers/auth.controller.js');

describe('Register Controller', () => {
  test('should return 201 on success', async () => {
    const req = {
      body: { email: 'test@example.com', password: '123456' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    authService.registerUser.mockResolvedValueOnce();

    await register(req, res);

    expect(authService.registerUser).toHaveBeenCalledWith('test@example.com', '123456');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered' });
  });
});
