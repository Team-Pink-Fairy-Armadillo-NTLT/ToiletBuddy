const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')


router.post('/', 
    reviewController.addReview,
    (req, res) => {
    return res.status(200);
    }
);

router.get('/:placeId', 
    reviewController.getReviews,
    (req, res) => {
      return res.status(200).send(res.locals.review);
    }
);


module.exports = router;