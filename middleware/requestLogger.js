import { logger } from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
};
