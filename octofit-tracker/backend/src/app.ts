import express from 'express';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.redirect('/api');
});

app.use('/api', apiRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({
    error: error.message || 'Unexpected server error',
  });
});

export default app;