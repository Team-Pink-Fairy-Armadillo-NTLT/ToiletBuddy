const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')


router.post('/:id', userController.checkPermissions, reviewController.addReview, (req, res) => {
  return res.sendStatus(200);
});

router.get('/:id', reviewController.getReviews, (req, res) => {
  return res.status(200).json({ data: res.locals.reviews });
});


module.exports = router;