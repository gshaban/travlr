const fs = require('fs');
const path = require('path');

const travel = (req, res) => {
  // The trip records are kept separate from the view so HBS can render them dynamically.
  const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
  const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

  res.render('travel', {
    title: 'Travlr Getaways - Travel',
    trips
  });
};

module.exports = {
  travel
};