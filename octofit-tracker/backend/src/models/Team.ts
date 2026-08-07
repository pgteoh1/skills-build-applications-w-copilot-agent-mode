import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    school: {
      type: String,
      default: 'Mergington High School',
      trim: true,
    },
    slogan: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);