const jwt = require('jsonwebtoken');
const queryRepository = require('../queryRepository');
const db = require('../models/appModels');

const reviewController = {};

reviewController.addReview = async (req, res, next) => {
    const { rating, text, name, address, toilet, sink, smell, cleanliness, tp, image } = req.body;
    const { googleId } = req.params;
    const { userId } = res.locals;
    //console.log('userId', userId)
    console.log(req.params)

    const getEstablishmentParams = [googleId]
    const getEstablishmentResult = await db.query(queryRepository.getEstablishmentByGoogleId, getEstablishmentParams);
    let establishment = getEstablishmentResult.rows.length ? getEstablishmentResult.rows[0] : null;

    if (!establishment) {
      // placeholder data rn for everything except google maps id
      const createEstablishmentParams = [googleId, 'testLat', 'testLong', name, address, 'Fakecity', 'FL', 11111];
      const createEstablishmentResult = await db.query(queryRepository.createEstablishmentByGoogleId, createEstablishmentParams);
      const rows = createEstablishmentResult.rows;
      establishment = rows[0];
    }
    
    const establishmentId = establishment._id;

    const createReviewParams = [establishmentId, userId, rating, text, toilet, sink, smell, cleanliness, tp];
    const result = await db.query(queryRepository.createReviewByEstablishmentId, createReviewParams);
    console.log('returning', result)
    let reviewId
    if(result.rows){
      reviewId = result.rows[0]._id
    }
    if(image && reviewId){
      await db.query(queryRepository.insertReviewImage, [reviewId, image])
    }

    return next();
}

reviewController.getReviews = async (req, res, next) => {

    const parameters = [req.params.googleId];

    try {
      const dbResult = await db.query(queryRepository.getReviewsByEstablishmentGoogleId, parameters);
      res.locals.reviews = dbResult.rows;
      return next();
    }
    catch {
      return next({ log: 'Error querying DB: getReviewsByEstablishmentGoogleId', message: { err: 'Could not retreive data. Check server logs for details' } });
    }
}

module.exports = reviewController;