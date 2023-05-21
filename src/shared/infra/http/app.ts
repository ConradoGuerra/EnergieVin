import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import "@shared/container";

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  console.log(err);
});

export default app;
