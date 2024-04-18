const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

const { validateEstablishment, addReviewAndImage, getAverageRating, getImage } = reviewController;

router.post('/:googleId', userController.checkPermissions, addReviewAndImage, (req, res) => {
  return res.status(200).json({ result: 'ok' });
});

router.get('/:googleId', validateEstablishment, addReviewAndImage, (req, res) => {
  return res.status(200).json({ data: res.locals.reviews });
});

router.get('/rating/:googleId', getAverageRating, (req, res) => {
  return res.status(200).json({ data: res.locals.rating });
});

router.get('/image/:googleId', getImage, (req, res) => {
  return res.status(200).json({ data: res.locals.photo });
});

module.exports = router;