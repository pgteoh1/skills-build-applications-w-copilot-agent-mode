import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [cardioKraken, strengthSquad, trailBlazers] = await Team.create([
      {
        name: 'Cardio Kraken',
        school: 'Mergington High School',
        slogan: 'Move daily. Compete weekly.',
      },
      {
        name: 'Strength Squad',
        school: 'Mergington High School',
        slogan: 'Form first. Power follows.',
      },
      {
        name: 'Trail Blazers',
        school: 'Mergington High School',
        slogan: 'Fresh air, steady pace.',
      },
    ]);

    const users = await User.create([
      {
        name: 'Paul Octo',
        email: 'paul.octo@mergingtonhigh.edu',
        fitnessLevel: 'intermediate',
        points: 180,
        team: cardioKraken._id,
      },
      {
        name: 'Avery Johnson',
        email: 'avery.johnson@mergingtonhigh.edu',
        fitnessLevel: 'beginner',
        points: 95,
        team: trailBlazers._id,
      },
      {
        name: 'Maya Patel',
        email: 'maya.patel@mergingtonhigh.edu',
        fitnessLevel: 'advanced',
        points: 245,
        team: strengthSquad._id,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@mergingtonhigh.edu',
        fitnessLevel: 'intermediate',
        points: 160,
        team: cardioKraken._id,
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@mergingtonhigh.edu',
        fitnessLevel: 'beginner',
        points: 110,
        team: trailBlazers._id,
      },
    ]);

    const [paul, avery, maya, jordan, sam] = users;

    await Workout.create([
      {
        title: 'After School Circuit',
        description: 'A balanced circuit focused on consistency for student athletes.',
        difficulty: 'intermediate',
        focusArea: 'full-body conditioning',
        durationMinutes: 35,
        recommendedFor: ['beginner', 'intermediate'],
      },
      {
        title: 'First Mile Builder',
        description: 'A walk-run progression for students building cardio confidence.',
        difficulty: 'beginner',
        focusArea: 'cardio endurance',
        durationMinutes: 25,
        recommendedFor: ['beginner'],
      },
      {
        title: 'Strength Fundamentals',
        description: 'Bodyweight strength work with safe form and clear rest windows.',
        difficulty: 'beginner',
        focusArea: 'strength training',
        durationMinutes: 30,
        recommendedFor: ['beginner', 'intermediate'],
      },
      {
        title: 'Advanced Tempo Run',
        description: 'A structured run for advanced students training sustained effort.',
        difficulty: 'advanced',
        focusArea: 'speed endurance',
        durationMinutes: 40,
        recommendedFor: ['advanced'],
      },
    ]);

    await Activity.create([
      {
        user: paul._id,
        type: 'running',
        durationMinutes: 25,
        caloriesBurned: 260,
        pointsEarned: 45,
        performedAt: new Date('2026-08-03T15:30:00Z'),
      },
      {
        user: avery._id,
        type: 'walking',
        durationMinutes: 35,
        caloriesBurned: 150,
        pointsEarned: 30,
        performedAt: new Date('2026-08-04T16:10:00Z'),
      },
      {
        user: maya._id,
        type: 'strength-training',
        durationMinutes: 45,
        caloriesBurned: 320,
        pointsEarned: 60,
        performedAt: new Date('2026-08-05T14:45:00Z'),
      },
      {
        user: jordan._id,
        type: 'running',
        durationMinutes: 30,
        caloriesBurned: 290,
        pointsEarned: 50,
        performedAt: new Date('2026-08-06T15:00:00Z'),
      },
      {
        user: sam._id,
        type: 'walking',
        durationMinutes: 40,
        caloriesBurned: 180,
        pointsEarned: 35,
        performedAt: new Date('2026-08-07T13:20:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      {
        user: maya._id,
        points: 245,
        period: 'weekly',
        rank: 1,
      },
      {
        user: paul._id,
        points: 180,
        period: 'weekly',
        rank: 2,
      },
      {
        user: jordan._id,
        points: 160,
        period: 'weekly',
        rank: 3,
      },
      {
        user: sam._id,
        points: 110,
        period: 'monthly',
        rank: 1,
      },
      {
        user: avery._id,
        points: 95,
        period: 'monthly',
        rank: 2,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
