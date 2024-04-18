const errorMessageConstants = 

  { ADD_REVIEW_ERR: { err: 'We couldn\'t post your review. Check server logs for details.' },
    
    GET_REVIEW_ERR: { err: 'We couldn\'t retrieve reviews for this establishment. Check server logs for details.' },

    GET_IMAGE_ERR: { err: 'We couldn\'t retrieve any images for this location. Check server logs for details.' },

    GET_RATING_ERR: { err: 'We couldn\'t calculate an average rating for this establishment. Check server logs for details.' },

    NO_AWD_ALLOWED: { err: 'oh my god stop it' },

    USER_NOT_AUTHORIZED: { err: 'You are not authorized to perform this action' },

    USER_READONLY_ACCESS: { result: 'You are not logged in but can view the page' },

    DEFAULT_ERR: { err: 'An error occurred'}
  };

module.exports = errorMessageConstants;