import { Router } from 'express';
import { apiBaseUrl } from '../config/baseUrl.js';
import healthRouter from './health.js';
import resourcesRouter from './resources.js';
import summaryRouter from './summary.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    endpoints: {
      health: '/api/health',
      summary: '/api/summary',
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
    },
    resources: ['users', 'teams', 'activities', 'workouts', 'leaderboard'],
  });
});

apiRouter.use('/health', healthRouter);
apiRouter.use('/summary', summaryRouter);
apiRouter.use(resourcesRouter);

export default apiRouter;