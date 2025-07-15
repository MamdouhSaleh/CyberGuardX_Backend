import express from 'express';
import { logger } from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorLogger } from './middleware/errorLogger.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
