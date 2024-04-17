const queryRepository = require('../queryRepository');
const db = require('../models/appModels');

const reviewController = {};

reviewController.addReview = async (req, res, next) => {
  const { rating, text, name, address, toilet, sink, smell, cleanliness, tp } = req.body;
  const { googleId } = req.params;
  const { userId } = res.locals;
  // console.log('userId', userId)
  // console.log(req.params)

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
    const result = await db.query(queryRepository.createReviewByEstablishmentId, createReviewParams);
    console.log('returning', result)
    return next();
  }
  catch (err) {
    return next({ log: err, message: { err: 'Could not add review. Check server logs for details' } });
  }
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