const errorMessages = 

  { ADD_REVIEW_ERR: { err: `We couldn\'t post your review. ${this.CHECK_SERVER_LOGS}` },

    CREATE_ESTABLISHMENT_ERR: { err: `We couldn\'t register that establishment in our system at this time. ${this.CHECK_SERVER_LOGS}`},

    ESTABLISHMENT_VALIDATION_ERR: { err: `We couldn\'t validate that establishment in our system. ${this.CHECK_SERVER_LOGS}` },
    
    GET_REVIEW_ERR: { err: `We couldn\'t retrieve reviews for this establishment. ${this.CHECK_SERVER_LOGS}` },

    GET_IMAGE_ERR: { err: `We couldn\'t retrieve any images for this location. ${this.CHECK_SERVER_LOGS}` },

    GET_RATING_ERR: { err: `We couldn\'t calculate an average rating for this establishment. ${this.CHECK_SERVER_LOGS}` },

    NO_AWD_ALLOWED: { err: 'oh my god stop it' },

    USER_NOT_AUTHORIZED: { err: 'You are not authorized to perform this action' },

    USER_READONLY_ACCESS: { result: 'You are not logged in but can view the page' },

    DEFAULT_ERR: { err: 'An error occurred'},

    CHECK_SERVER_LOGS: 'Check server logs for details.'
  };

module.exports = errorMessages;