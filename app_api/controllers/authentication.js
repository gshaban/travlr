const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save();
    const token = user.generateJWT();

    return res
      .status(200)
      .json({ token });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'Email address already registered' });
    }

    return res
      .status(400)
      .json({ message: 'Unable to register user.', error: error.message });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res
        .status(404)
        .json(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res
        .status(200)
        .json({ token });
    }

    return res
      .status(401)
      .json(info);
  })(req, res);
};

module.exports = {
  register,
  login
};
