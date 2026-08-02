const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

mongoose.set('strictQuery', true);

const gracefulShutdown = (message, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${message}`);
    callback();
  });
};

// Build the connection string and set the connection timeout.
// timeout is in milliseconds.
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {
  }), 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Capture app termination/restart events
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => {
    process.exit(0);
  });
});

connect();
require('./travlr');
module.exports = mongoose;
