const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    pageTitle: 'Home',
    pageHeading: 'Find your next getaway.',
    pageText: 'Travlr Getaways helps travelers compare relaxing destinations and plan memorable trips with clear, simple information.',
    pageLink: '/travel',
    pageLinkText: 'View travel packages',
    homeSelected: true
  });
};

const rooms = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - Rooms',
    pageTitle: 'Rooms',
    pageHeading: 'Rooms',
    pageText: 'Choose comfortable rooms designed for relaxing stays near the beach.',
    roomsSelected: true
  });
};

const meals = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - Meals',
    pageTitle: 'Meals',
    pageHeading: 'Meals',
    pageText: 'Explore meal options with fresh seafood, buffet choices, and resort dining.',
    mealsSelected: true
  });
};

const news = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - News',
    pageTitle: 'News',
    pageHeading: 'News',
    pageText: 'Read updates about travel packages, resort activities, and guest experiences.',
    newsSelected: true
  });
};

const about = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - About',
    pageTitle: 'About',
    pageHeading: 'About',
    pageText: 'Travlr Getaways connects travelers with beach resort experiences and clear trip information.',
    aboutSelected: true
  });
};

const contact = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - Contact',
    pageTitle: 'Contact',
    pageHeading: 'Contact',
    pageText: 'Contact Travlr Getaways for help planning a resort stay or learning more about current packages.',
    contactSelected: true
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
