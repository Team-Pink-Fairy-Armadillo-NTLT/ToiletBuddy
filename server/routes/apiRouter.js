const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

router.post('/:googleId', userController.checkPermissions, reviewController.addReview, (req, res) => {
  return res.status(200).json({ result: 'ok' });
});

router.get('/:googleId', reviewController.getReviews, (req, res) => {
  return res.status(200).json({ data: res.locals.reviews });
});

router.get('/rating/:googleId', reviewController.getAverageRating, (req, res) => {
  return res.status(200).json({ data: res.locals.rating });
});

router.get('/image/:googleId', reviewController.getImage, (req, res) => {
  return res.status(200).json({ data: res.locals.photo });
});

module.exports = router;