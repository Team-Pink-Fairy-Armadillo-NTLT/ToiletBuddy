const jwt = require('jsonwebtoken');
const queryRepository = require('../queryRepository');
const db = require('../models/appModels');

const reviewController = {};

reviewController.addReview = (req, res, next) => {
    console.log('I am in add review')
    const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
    const username = response.username
    //can get username from cookie for post request to add a review
    return next()
}

reviewController.getReviews = async (req, res, next) => {
    const parameters = [req.params.id];

    // try {
      const dbResult = await db.query(queryRepository.getReviewsByEstablishmentGoogleId, parameters);
      res.locals.reviews = dbResult.rows;
      console.log(res.locals.reviews);
      return next();
    // }
    // catch {
    //   return next({ log: 'Error querying DB: getReviewsByEstablishmentGoogleId', message: { err: 'Could not retreive data. Check server logs for details' } });
    // }
}

module.exports = reviewController;