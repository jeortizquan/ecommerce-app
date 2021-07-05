import express, { Application } from 'express';
import router from '@src/routes/api';

export default function createServer(): express.Application {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);

  return app;
}
