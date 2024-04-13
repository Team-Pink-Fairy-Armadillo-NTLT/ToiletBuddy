// this file is just for now so I can write a bunch of different queries without messing with other files

const queryRepository = {};

// pass in parameters array [ given_googlemaps_id ]
queryRepository.getReviewsByEstablishmentGoogleId = `
  select
    reviews._id,
    establishments._id,
    rating,
    review_text,
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

// check if establishment already exists
queryRepository.getEstablishmentByGoogleId = `
  select *
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
`;

// pass along new establishment_id to next query -> array [new_bathroom_id, user_id, input_rating, input_review_text]
queryRepository.createReviewByEstablishmentGoogleId = `
  insert into 
    reviews (establishment_id, user_id, rating, review_text)
  values
    ($1, $2, $3, $4)
`;

module.exports = queryRepository;

