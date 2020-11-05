import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
