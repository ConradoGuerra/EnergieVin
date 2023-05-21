import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';

const app = express();
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: AppError, _request: Request, response: Response) => {
  console.log(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;
