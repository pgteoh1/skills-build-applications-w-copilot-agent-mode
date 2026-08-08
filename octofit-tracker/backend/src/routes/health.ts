import { Router } from 'express';
import db from '../config/database.js';
import { apiBaseUrl } from '../config/baseUrl.js';

const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.json({
    app: 'octofit-tracker-api',
    status: 'ok',
    baseUrl: apiBaseUrl,
    port: Number(process.env.PORT || 8000),
    database: db.readyState === 1 ? 'connected' : 'connecting',
  });
});

export default healthRouter;