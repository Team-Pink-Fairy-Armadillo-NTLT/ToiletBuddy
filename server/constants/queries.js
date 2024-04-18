const queries = {};

// requires array: [google_maps_id]
queries.getReviewsByEstablishmentGoogleId = `
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
    image_b64,
    users.username as username
  from reviews
    inner join users on reviews.user_id = users._id
    inner join establishments on reviews.establishment_id = establishments._id
    left outer join review_images on review_images.review_id = reviews._id
  where establishments.google_maps_id = $1
`;

// return images later so they don't slow down original query
// queryRepository.getReviewImagesByEstablishmentGoogleId = `
//   SELECT
//     reviews._id,
//     image_b64
//   FROM
//     reviews
//   INNER JOIN
//     review_images
//     ON review_images.review_id = reviews._id
//   INNER JOIN
//     establishments
//     ON establishments ON reviews.establishment_id = establishments._id
//   WHERE
//     establishments.google_maps_id = $1
//`

/* 
workflow for adding new establishment from scratch:
  - when review is added, an establishment needs to be created in the db if it doesn't already exist for 
    that Google Maps location
  - a review needs to be created in the db mapped to that establishment
*/

// requires array: [google_maps_id]
queries.getEstablishmentByGoogleId = `
  select _id
  from establishments
  where google_maps_id = $1 
`;

// if result of previous query is empty, need to create establishment
// pass in array with pertinent data
queries.createEstablishmentByGoogleId = `
  insert into 
    establishments (google_maps_id, latitude, longitude, name, address, city, state, zip_code)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8)
  returning _id
`;

// pass along new or existing establishment_id to next query -> array [new_establishment_id, user_id, ...review_components]
queries.createReviewByEstablishmentId = `
  insert into 
    reviews (establishment_id, user_id, rating, text, toilet, sink, smell, cleanliness, tp)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning _id
`;

queries.getAverageRatingByEstablishmentGoogleId = `
  select 
    AVG(rating)
  from reviews 
    inner join establishments on reviews.establishment_id = establishments._id
  where establishments.google_maps_id = $1
`;

queries.getUserIdByUsername = 'SELECT _id FROM users WHERE username = $1';

queries.insertUser = 'INSERT INTO users (username) VALUES ($1) RETURNING (_id)';

queries.insertReviewImage = 'INSERT INTO review_images (review_id, image_b64) VALUES ($1, $2)'

queries.getImageForReview = `
  select
    image_b64 as image
  from review_images
    inner join reviews on review_images.review_id = reviews._id
    inner join establishments on reviews.establishment_id = establishments._id
  where establishments.google_maps_id = $1
  limit 1
`;

module.exports = queries;

