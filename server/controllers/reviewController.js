const jwt = require('jsonwebtoken');
const queryRepository = require('../queryRepository');
const db = require('../models/appModels');
const { query } = require('express');

const reviewController = {};

reviewController.addReview = async (req, res, next) => {
    console.log('I am in add review')
    const review = req.body;
    const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
    const username = response.username
    //can get username from cookie for post request to add a review

    const getEstablishmentResult = await db.query(queryRepository.getEstablishmentByGoogleId, [req.params.id]);
    const establishment = getEstablishmentResult.rows.length ? getEstablishmentResult.rows[0] : null;

    if (!establishment) {
      const createEstablishmentResult = await db.query(queryRepository.createEstablishmentByGoogleId, [req.params.id]);
      const rows = createEstablishmentResult.rows;
      console.log(rows);
    } else establishmentId = establishment._id;

    const createReviewParams = [establishment_id, userId, review.rating, review.text];
    await db.query(queryRepository.createReviewByEstablishmentId, params);

    return next()
}

reviewController.getReviews = async (req, res, next) => {
    const parameters = [req.params.id];

    try {
      const dbResult = await db.query(queryRepository.getReviewsByEstablishmentGoogleId, parameters);
      res.locals.reviews = dbResult.rows;
      console.log(res.locals.reviews);
      return next();
    }
    catch {
      return next({ log: 'Error querying DB: getReviewsByEstablishmentGoogleId', message: { err: 'Could not retreive data. Check server logs for details' } });
    }
}

module.exports = reviewController;