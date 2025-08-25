// config/env.js
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/quiz_system',
  JWT_SECRET: process.env.JWT_SECRET || 'changeme',
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '1h'
};
