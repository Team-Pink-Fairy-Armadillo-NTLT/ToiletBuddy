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
  "latitude" varchar NOT NULL,
  "longitude" varchar NOT NULL,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "city" varchar NOT NULL,
  "state" varchar NOT NULL,
  "zip_code" int NOT NULL,
  CONSTRAINT "establishments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE reviews (
  "_id" serial NOT NULL,
  "establishment_id" int NOT NULL,
  "user_id" int NOT NULL,
  "rating" varchar,
  "review_text" varchar NOT NULL,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.reviews ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("establishment_id") REFERENCES public.establishments("_id");
ALTER TABLE public.reviews ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("user_id") REFERENCES public.users("_id");