const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripFields = req => ({
  code: req.body.code,
  name: req.body.name,
  length: req.body.length,
  start: req.body.start,
  resort: req.body.resort,
  perPerson: req.body.perPerson,
  image: req.body.image,
  description: req.body.description
});

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

// POST: /trips - Adds a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(tripFields(req));
    return res.status(201).json(trip);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to add trip.', error: error.message });
  }
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip
      .findOneAndUpdate(
        { code: req.params.tripCode },
        tripFields(req),
        { new: true, runValidators: true }
      )
      .exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${req.params.tripCode} was not found.` });
    }

    return res.status(201).json(trip);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update trip.', error: error.message });
  }
};

// DELETE: /trips/:tripCode - Deletes an existing trip
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip
      .findOneAndDelete({ code: req.params.tripCode })
      .exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${req.params.tripCode} was not found.` });
    }

    return res.status(200).json({ message: `Trip code ${req.params.tripCode} deleted successfully.` });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete trip.', error: error.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
