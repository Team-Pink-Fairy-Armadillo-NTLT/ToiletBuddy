const reviewController = {}

reviewController.addReview = (req, res, next) => {
    console.log('I am in add review')
    return next()
}

reviewController.getReviews = (req, res, next) => {
    console.log('I am in get review')
    return next()
}

module.exports = reviewController;