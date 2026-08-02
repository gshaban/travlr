const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found.' });
    }

    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve trip data.', error: error.message });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip
      .findOne({ code: req.params.tripCode })
      .exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${req.params.tripCode} was not found.` });
    }

    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve trip data.', error: error.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
