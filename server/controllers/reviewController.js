const queries = require('../constants/queries');
const db = require('../models/appModels');
const errorMessages = require('../constants/errorMessages');

const reviewController = {};

reviewController.validateEstablishment = async (req, res, next) => {
  const { googleId } = req.params;

  try {
    const getEstablishmentParams = [googleId];
    const getEstablishmentResult = await db.query(queries.getEstablishmentByGoogleId, getEstablishmentParams);
    res.locals.establishment = getEstablishmentResult.rows.length ? getEstablishmentResult.rows[0] : null;

    return next();
  }
  catch (err) {
    return next({ log: `reviewController.validateEstablishment: ${err}`, message: errorMessages.ESTABLISHMENT_VALIDATION_ERR });
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
    const createEstablishmentResult = await db.query(queries.createEstablishmentByGoogleId, createEstablishmentParams);
    const rows = createEstablishmentResult.rows;
    res.locals.establishment = rows[0];
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.createNewEstablishment: ${err}`, message: errorMessages.CREATE_ESTABLISHMENT_ERR });
  }
}

reviewController.addReviewAndImage = async (req, res, next) => {
  const { rating, text, toilet, sink, smell, cleanliness, tp, image } = req.body;
  const { userId, establishment } = res.locals;

  console.log(req.body);

  if (text.includes('awd')) {
    return next({ message: errorMessages.NO_AWD_ALLOWED });
  }

  try {
    const establishmentId = establishment._id;

    const createReviewParams = [establishmentId, userId, rating, text, toilet, sink, smell, cleanliness, tp];
    const result = await db.query(queries.createReviewByEstablishmentId, createReviewParams);

    let reviewId;
    if (result.rows.length) {
      reviewId = result.rows[0]._id
    }
    if (image && reviewId) {
      await db.query(queries.insertReviewImage, [reviewId, image])
    }
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.addReviewAndImage: ${err}`, message: errorMessages.ADD_REVIEW_ERR });
  }
}

reviewController.getReviews = async (req, res, next) => {
  const parameters = [req.params.googleId];
  console.log('parameters', parameters);

  try {
    const dbResult = await db.query(queries.getReviewsByEstablishmentGoogleId, parameters);
    res.locals.reviews = dbResult.rows;
    return next();
  }
  catch (error) {
    return next({ log: `reviewController.getReviews: ${error}`, message: errorMessages.GET_REVIEW_ERR });
  }
}

reviewController.getAverageRating = async (req, res, next) => {
  const parameters = [req.params.googleId];

  try {
    const getAvgRatingResult = await db.query(queries.getAverageRatingByEstablishmentGoogleId, parameters);
    const { avg } = getAvgRatingResult.rows[0];
    res.locals.rating = avg;
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.getAverageRating: ${err}`, message: errorMessages.GET_RATING_ERR });
  }
}

reviewController.getImage = async (req, res, next) => {
  const parameters = [req.params.googleId]
  try {
    const getImageResult = await db.query(queries.getImageForReview, parameters);
    const { image } = getImageResult.rows[0];
    res.locals.image = image;
    return next();
  }
  catch (err) {
    return next({ log: `reviewController.getImage: ${err}`, message: errorMessages.GET_IMAGE_ERR });
  }
}

module.exports = reviewController;
