const mongoose = require('mongoose');
const seedTrips = require('../../data/trips.json');

const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(seedTrips);
    }

    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve trip data.', error: error.message });
  }
};

module.exports = {
  tripsList
};