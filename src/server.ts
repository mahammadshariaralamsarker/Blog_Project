import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './config';

let server: Server;

async function Main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app running port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Main();
process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is Rejected And Server Shutting down ');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject();
process.on('uncaughtException', () => {
  console.log('Uncaught Exception  is Rejected And Server Shutting down ');
  process.exit(1);
});
