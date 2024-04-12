// this file is just for now so I can write a bunch of different queries without messing with other files

// pass in parameters array [ given_bathroom_id ]
const getReviewsByBathroomId = `
  select 
    reviews._id, 
    bathroom_id, 
    user_id, 
    rating, 
    review_text,
    users.username as username,
    establishments.name as establishment_name,
    establishments.google_maps_id as establishment_google_id
  from reviews
    inner join bathrooms on reviews.bathroom_id = bathrooms._id
    inner join users on reviews.user_id = users._id
    inner join establishments on bathrooms.establishment_id = establishments.id
  where bathroom_id = $1
`;

// pass in parameters array [ given_googlemaps_id ]
const getReviewsByEstablishmentGoogleId = `
  select
    reviews._id,
    bathroom_id,
    user_id,
    rating
    review_text,
    users.username as username
  from reviews
    inner join bathrooms on reviews.bathroom_id = bathrooms._id
    inner join establishments on bathrooms.establishment_id = establishments.id
  where establishments.google_maps_id = $1
`;

// pass in parameters array [ given_googlemaps_id ]
const getBathroomsByEstablishmentGoogleId = `
  select
    bathrooms._id,
    short_descr
  from bathrooms
    inner join establishments on bathrooms.establishment_id = establishments._id
  where establishments.google_maps_id = $1
`;


/* 
workflow for adding new establishment from scratch:
  - when review is added, an establishment needs to be created in the db if it doesn't already exist for 
    that Google Maps location
  - a bathroom needs to be created in the db mapped to that establishment
  - a review needs to be created in the db mapped to that bathroom
*/

// pass in array with pertinent data
const createEstablishmentByGoogleId = `
  insert into 
    establishments (google_maps_id, name, address, city, state, zip_code)
  values
    ($1, $2, $3, $4, $5, $6)
`;

// pass along new establishment_id to next query -> array [new_establishment_id, input_descr]

const createBathroomByEstablishmentGoogleId = `
  insert into
    bathrooms (establishment_id, short_descr)
  values
    ($1, $2)
`;

// pass along new bathroom_id to next query -> array [new_bathroom_id, user_id, input_rating, input_review_text]

const createReviewByEstablishmentGoogleId = `
  insert into 
    reviews (bathroom_id, user_id, rating, review_text)
  values
    ($1, $2, $3, $4)
`;

