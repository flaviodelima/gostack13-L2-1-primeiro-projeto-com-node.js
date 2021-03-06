/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // needed for the global exception handler

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import 'shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
