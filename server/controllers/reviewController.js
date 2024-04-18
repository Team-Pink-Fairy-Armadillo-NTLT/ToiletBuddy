const queryRepository = require('../queryRepository');
const db = require('../models/appModels');
const errorMessageConstants = require('../constants/errorMessageConstants');

const reviewController = {};

reviewController.addReview = async (req, res, next) => {
  const { rating, text, name, address, toilet, sink, smell, cleanliness, tp } = req.body;
  const { googleId } = req.params;
  const { userId } = res.locals;

  if (text.includes('awd')) {
    return next({ message: errorMessageConstants.NO_AWD_ALLOWED })
  }

  try {
    const getEstablishmentParams = [googleId];
    const getEstablishmentResult = await db.query(queryRepository.getEstablishmentByGoogleId, getEstablishmentParams);
    let establishment = getEstablishmentResult.rows.length ? getEstablishmentResult.rows[0] : null;
    if (!establishment) {
      // placeholder data for latitude, longitude, city, state, zip
      const createEstablishmentParams = [googleId, 'testLat', 'testLong', name, address, 'Fakecity', 'FL', 11111];
      const createEstablishmentResult = await db.query(queryRepository.createEstablishmentByGoogleId, createEstablishmentParams);
      const rows = createEstablishmentResult.rows;
      establishment = rows[0];
    }
    const establishmentId = establishment._id;

    const createReviewParams = [establishmentId, userId, rating, text, toilet, sink, smell, cleanliness, tp];
    await db.query(queryRepository.createReviewByEstablishmentId, createReviewParams);
    return next();
  }
  catch (error) {
    return next({ log: `reviewController.addReviews: ${error}`, message: errorMessageConstants.ADD_REVIEW_ERR });
  }
}

reviewController.getReviews = async (req, res, next) => {
  const parameters = [req.params.googleId];

  try {
    const dbResult = await db.query(queryRepository.getReviewsByEstablishmentGoogleId, parameters);
    res.locals.reviews = dbResult.rows;
    return next();
  }
  catch (error) {
    return next({ log: `reviewController.getReviews: ${error}`, message: errorMessageConstants.GET_REVIEW_ERR });
  }
}

reviewController.getAverageRatingAndImage = async (req, res, next) => {
  const parameters = [req.params.googleId];

  try {
    const getAvgRatingResult = await db.query(queryRepository.getAverageRatingByEstablishmentGoogleId, parameters);
    const avgRating = getAvgRatingResult[0].avg;

    const getImageResult = await db.
  }
}

module.exports = reviewController;