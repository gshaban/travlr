const mongoose = require('mongoose');
const trips = require('../../data/trips.json');
const Trip = require('./travlr');
const User = require('./user');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    const tripCount = await Trip.countDocuments({});
    const adminEmail = 'shaban.ghaith@snhu.edu';
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const user = new User({
        name: 'Shaban Ghaith',
        email: adminEmail
      });

      user.setPassword('shaban@123');
      await user.save();
      console.log(`Seeded admin user ${adminEmail}.`);
    } else {
      console.log(`Admin user ${adminEmail} already exists; seed skipped.`);
    }

    if (tripCount > 0) {
      console.log(`travlr.trips already has ${tripCount} record(s); seed skipped.`);
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
