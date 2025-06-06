CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "class" varchar,
  "course" varchar,
  "group" varchar,
  "role" varchar,
  "email" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "rooms" (
  "id" SERIAL PRIMARY KEY,
  "code" varchar NOT NULL UNIQUE,
  "name" varchar,
  "floor" varchar,
  "capacity" int
);

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" SERIAL PRIMARY KEY,
  "room_id" int,
  "user_id" int,
  "time_slot" varchar,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "bookings" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");
ALTER TABLE "bookings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
