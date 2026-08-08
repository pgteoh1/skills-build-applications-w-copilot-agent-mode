import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const resourcesRouter = Router();

resourcesRouter.get('/users', async (_request, response, next) => {
  try {
    const users = await User.find().populate('team', 'name slogan').sort({ name: 1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

resourcesRouter.get('/teams', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

resourcesRouter.get('/activities', async (_request, response, next) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email fitnessLevel')
      .sort({ performedAt: -1 })
      .lean();

    response.json(activities);
  } catch (error) {
    next(error);
  }
});

resourcesRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'name email points')
      .sort({ period: 1, rank: 1 })
      .lean();

    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

resourcesRouter.get('/workouts', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default resourcesRouter;