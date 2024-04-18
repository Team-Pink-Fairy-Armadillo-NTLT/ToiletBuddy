const queryRepository = {};

// requires array: [google_maps_id]
queryRepository.getReviewsByEstablishmentGoogleId = `
  select
    reviews._id,
    establishments._id,
    rating,
    text,
    toilet,
    sink, 
    smell,
    cleanliness,
    tp,
    users.username as username
  from reviews
    inner join users on reviews.user_id = users._id
    inner join establishments on reviews.establishment_id = establishments._id
  where establishments.google_maps_id = $1
`;

/* 
workflow for adding new establishment from scratch:
  - when review is added, an establishment needs to be created in the db if it doesn't already exist for 
    that Google Maps location
  - a review needs to be created in the db mapped to that establishment
*/

// requires array: [google_maps_id]
queryRepository.getEstablishmentByGoogleId = `
  select _id
  from establishments
  where google_maps_id = $1 
`;

// if result of previous query is empty, need to create establishment
// pass in array with pertinent data
queryRepository.createEstablishmentByGoogleId = `
  insert into 
    establishments (google_maps_id, latitude, longitude, name, address, city, state, zip_code)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8)
  returning _id
`;

// pass along new or existing establishment_id to next query -> array [new_establishment_id, user_id, ...review_components]
queryRepository.createReviewByEstablishmentId = `
  insert into 
    reviews (establishment_id, user_id, rating, text, toilet, sink, smell, cleanliness, tp)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning _id
`;

queryRepository.getAverageRatingByEstablishmentGoogleId = `
  select 
    AVG(rating)
  from reviews 
    inner join establishments on reviews.establishment_id = establishments._id
  where establishments.google_maps_id = $1
`;

queryRepository.getUserId = 'SELECT _id FROM users WHERE username = $1';

queryRepository.insertUser = 'INSERT INTO users (username) VALUES ($1) RETURNING (_id)';

module.exports = queryRepository;

