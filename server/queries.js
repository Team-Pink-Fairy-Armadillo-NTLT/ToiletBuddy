// this file is just for now so I can write a bunch of different queries without messing with other files

// pass in parameters array [ given_googlemaps_id ]
const getReviewsByEstablishmentGoogleId = `
  select
    reviews._id,
    establishment_id,
    user_id,
    rating
    review_text,
    users.username as username
  from reviews
    inner join establishments on reviews.establishment_id = establishments.id
  where establishments.google_maps_id = $1
`;

/* 
workflow for adding new establishment from scratch:
  - when review is added, an establishment needs to be created in the db if it doesn't already exist for 
    that Google Maps location
  - a review needs to be created in the db mapped to that establishment
*/

// pass in array with pertinent data
const createEstablishmentByGoogleId = `
  insert into 
    establishments (google_maps_id, latitude, longitude, name, address, city, state, zip_code)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8)
`;

// pass along new establishment_id to next query -> array [new_bathroom_id, user_id, input_rating, input_review_text]
const createReviewByEstablishmentGoogleId = `
  insert into 
    reviews (establishment_id, user_id, rating, review_text)
  values
    ($1, $2, $3, $4)
`;

