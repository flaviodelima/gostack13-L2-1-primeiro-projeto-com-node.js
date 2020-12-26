import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
