const mongoose = require('mongoose');
const seedTrips = require('../../data/trips.json');

const Trip = require('./travlr');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}:27017/travlr`;

mongoose.set('strictQuery', true);

const seedDatabaseIfEmpty = async () => {
  const count = await Trip.countDocuments({});

  if (count === 0) {
    await Trip.insertMany(seedTrips);
    console.log(`Seeded ${seedTrips.length} trips into travlr.trips.`);
  }
};

const gracefulShutdown = (message, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${message}`);
    if (callback) {
      callback();
    }
  });
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
  const readLine = require('readline');
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

const connect = async () => {
  try {
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 5000
    });
    await seedDatabaseIfEmpty();
  } catch (error) {
    console.error('Mongoose initial connection error:', error.message);
  }
};

connect();

module.exports = mongoose;