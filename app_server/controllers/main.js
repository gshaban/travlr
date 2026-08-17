const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    activeHome: true
  });
};

const rooms = (req, res) => {
  res.render('rooms', {
    title: 'Travlr Getaways - Rooms',
    activeRooms: true
  });
};

const meals = (req, res) => {
  res.render('meals', {
    title: 'Travlr Getaways - Meals',
    activeMeals: true
  });
};

const news = (req, res) => {
  res.render('news', {
    title: 'Travlr Getaways - News',
    activeNews: true
  });
};

const about = (req, res) => {
  res.render('about', {
    title: 'Travlr Getaways - About',
    activeAbout: true
  });
};

const contact = (req, res) => {
  res.render('contact', {
    title: 'Travlr Getaways - Contact',
    activeContact: true
  });
};

module.exports = {
  index,
  rooms,
  meals,
  news,
  about,
  contact
};
