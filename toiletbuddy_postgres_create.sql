SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE users (
  "_id" serial NOT NULL,
  "username" varchar,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE establishments (
  "_id" serial NOT NULL,
  "google_maps_id" varchar NOT NULL,
  "latitude" varchar,
  "longitude" varchar,
  "name" varchar,
  "address" varchar,
  "city" varchar,
  "state" varchar,
  "zip_code" int,
  CONSTRAINT "establishments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE reviews (
  "_id" serial NOT NULL,
  "establishment_id" int,
  "user_id" int,
  "rating" varchar,
  "review_text" varchar,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE review_images (
  "review_id" INT,
  "image_b64" TEXT,
  CONSTRAINT "review_images_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE reviews ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("establishment_id") REFERENCES public.establishments("_id");
ALTER TABLE reviews ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("user_id") REFERENCES public.users("_id");