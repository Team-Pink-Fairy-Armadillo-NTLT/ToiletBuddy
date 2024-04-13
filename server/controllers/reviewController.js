const reviewController = {}
var jwt = require('jsonwebtoken')


reviewController.addReview = (req, res, next) => {
    console.log('I am in add review')
    const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
    const username = response.username
    //can get username from cookie for post request to add a review
    return next();
}

reviewController.getReviews = (req, res, next) => {
    console.log('I am in get review')
    return next();
}

module.exports = reviewController;