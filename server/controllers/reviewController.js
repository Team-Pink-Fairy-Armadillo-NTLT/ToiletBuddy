const queryRepository = require('../queryRepository');
const db = require('../models/appModels');
const errorMessageConstants = require('../constants/errorMessageConstants');

const reviewController = {};

reviewController.validateEstablishment = async (req, res, next) => {
  const { googleId } = req.params;

  try {
    const getEstablishmentParams = [googleId];
    const getEstablishmentResult = await db.query(queryRepository.getEstablishmentByGoogleId, getEstablishmentParams);
    res.locals.establishment = getEstablishmentResult.rows.length ? getEstablishmentResult.rows[0] : null;

    return next();
  }
  catch (err) {
    return next({ log: `reviewController.validateEstablishment: ${err}`, message: errorMessageConstants.ESTABLISHMENT_VALIDATION_ERR });
  }
}

reviewController.createNewEstablishment = async (req, res, next) => {
  const { googleId } = req.params;
  const { name, address } = req.body;
  const { establishment } = res.locals;

  if (establishment) return next();

  try {
    // placeholder data for latitude, longitude, city, state, zip
    const createEstablishmentParams = [googleId, 'testLat', 'testLong', name, address, 'Fakecity', 'FL', 11111];
    const createEstablishmentResult = await db.query(queryRepository.createEstablishmentByGoogleId, createEstablishmentParams);
    const rows = createEstablishmentResult.rows;
    res.locals.establishment = rows[0];
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.createNewEstablishment: ${err}`, message: errorMessageConstants.CREATE_ESTABLISHMENT_ERR });
  }
}

reviewController.addReviewAndImage = async (req, res, next) => {
  const { rating, text, toilet, sink, smell, cleanliness, tp, image } = req.body;
  const { userId, establishment } = res.locals;

  console.log(req.body);

  if (text.includes('awd')) {
    return next({ message: errorMessageConstants.NO_AWD_ALLOWED });
  }

  try {
    const establishmentId = establishment._id;

    const createReviewParams = [establishmentId, userId, rating, text, toilet, sink, smell, cleanliness, tp];
    const result = await db.query(queryRepository.createReviewByEstablishmentId, createReviewParams);

    let reviewId;
    if (result.rows.length) {
      reviewId = result.rows[0]._id
    }
    if (image && reviewId) {
      await db.query(queryRepository.insertReviewImage, [reviewId, image])
    }
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.addReviewAndImage: ${err}`, message: errorMessageConstants.ADD_REVIEW_ERR });
  }
}

reviewController.getReviews = async (req, res, next) => {
  const parameters = [req.params.googleId];
  console.log('parameters', parameters);

  try {
    const dbResult = await db.query(queryRepository.getReviewsByEstablishmentGoogleId, parameters);
    res.locals.reviews = dbResult.rows;
    return next();
  }
  catch (error) {
    return next({ log: `reviewController.getReviews: ${error}`, message: errorMessageConstants.GET_REVIEW_ERR });
  }
}

reviewController.getAverageRating = async (req, res, next) => {
  const parameters = [req.params.googleId];

  try {
    const getAvgRatingResult = await db.query(queryRepository.getAverageRatingByEstablishmentGoogleId, parameters);
    const avgRating = getAvgRatingResult.rows[0].avg;
    res.locals.rating = avgRating;
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.getAverageRating: ${err}`, message: errorMessageConstants.GET_RATING_ERR });
  }
}

reviewController.getImage = async (req, res, next) => {
  const parameters = [req.params.googleId]
  try {
    const getImageResult = await db.query(queryRepository.getImageForReview, parameters);
    const image = getImageResult.rows[0].image;
    res.locals.photo = image;
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.getImage: ${err}`, message: errorMessageConstants.GET_IMAGE_ERR });
  }
}

module.exports = reviewController;