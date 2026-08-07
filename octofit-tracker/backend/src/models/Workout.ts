import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    focusArea: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    recommendedFor: {
      type: [String],
      default: ['beginner'],
    },
  },
  {
    timestamps: true,
  },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);