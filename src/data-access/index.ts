/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import mongoose from 'mongoose';
import log from '@src/utils/logger';

function connectToMongoDB() {
  const dbUri =
    `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin` as string;
  log.info(
    `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:xxxxx@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`
  );
  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      log.info('Database connected');
    })
    .catch(error => {
      log.error('db error', error);
      process.exit(1);
    });
}

export default connectToMongoDB;
