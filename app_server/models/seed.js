const mongoose = require('mongoose');
const trips = require('../../data/trips.json');
const Trip = require('./travlr');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}:27017/travlr`;

const seedTrips = async () => {
  try {
    await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 });
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log(`Seeded ${trips.length} trips into the travlr.trips collection.`);
  } catch (error) {
    console.error('Unable to seed trips:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedTrips();