import { logger } from '../utils/logger.js';

export const errorLogger = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(500).json({ error: 'Something went wrong!' });
};
