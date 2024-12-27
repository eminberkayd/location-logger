import * as dotenv from 'dotenv';
dotenv.config({}); // Load .env file

import { dbConfig } from './db.config';

export const config = {
  DB: dbConfig,
  BATCH_SIZE: +process.env.BATCH_SIZE || 100, // Number of locations to process in each batch
  INTERVAL_TIME: +process.env.INTERVAL_TIME || 1000, // Interval between location processing cycles (in milliseconds)
  LISTEN_PORT: +process.env.LISTEN_PORT || 3000,
};
