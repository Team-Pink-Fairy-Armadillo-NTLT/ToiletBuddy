const express = require('express');
const router = express.Router()
const reviewController = require('../controllers/reviewController')




router.post('/', 
    reviewController.addReview,
    (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }
);

router.get('/', 
    reviewController.getReviews,
    (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }
);

module.exports = router