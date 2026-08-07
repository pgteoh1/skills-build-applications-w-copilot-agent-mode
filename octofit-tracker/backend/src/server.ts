import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    app: 'octofit-tracker-api',
    status: 'ok',
    port,
    database: db.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});