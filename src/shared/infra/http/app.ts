import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import '@shared/container';

const app = express();
app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _request: Request, _response: Response, _: NextFunction) => {
  console.log(err);
});

export default app;
