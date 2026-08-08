import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const summaryRouter = Router();

summaryRouter.get('/', async (_request, response, next) => {
  try {
    const [users, teams, activities, workouts, leaderboardEntries] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Workout.countDocuments(),
      LeaderboardEntry.countDocuments(),
    ]);

    response.json({
      users,
      teams,
      activities,
      workouts,
      leaderboardEntries,
    });
  } catch (error) {
    next(error);
  }
});

export default summaryRouter;