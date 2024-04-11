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

CREATE TABLE public.users (
  "_id" serial NOT NULL,
  "username" varchar,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.establishments (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "city" varchar NOT NULL,
  "state" varchar NOT NULL,
  "zip_code" int NOT NULL,
  CONSTRAINT "establishments_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.bathrooms (
  "_id" serial NOT NULL,
  "establishment_id" int NOT NULL,
  "short_descr" varchar NOT NULL,
  CONSTRAINT "bathrooms_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.reviews (
  "_id" serial NOT NULL,
  "bathroom_id" int NOT NULL,
  "user_id" int NOT NULL,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.reviews ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("bathroom_id") REFERENCES public.bathrooms("_id");
ALTER TABLE public.reviews ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.bathrooms ADD CONSTRAINT "bathrooms_fk0" FOREIGN KEY ("establishment_id") REFERENCES public.establishments("_id");