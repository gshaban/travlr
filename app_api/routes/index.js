const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const headers = authHeader.split(' ');
  if (headers.length !== 2 || headers[0] !== 'Bearer') {
    return res.sendStatus(401);
  }

  try {
    req.auth = jwt.verify(headers[1], process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
