const mongoose = require('mongoose');
const trips = require('../../data/trips.json');
const Trip = require('./travlr');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    const count = await Trip.countDocuments({});

    if (count > 0) {
      console.log(`travlr.trips already has ${count} record(s); seed skipped.`);
      return;
    }

    await Trip.insertMany(trips);
    console.log(`Seeded ${trips.length} trips into travlr.trips.`);
  } catch (error) {
    console.error('Unable to seed database:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
