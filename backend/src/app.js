import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import taskRoutes from './routes/taskRoutes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json({ limit: '10kb' }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API TodoList funcionando' });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
