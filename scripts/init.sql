CREATE TABLE IF NOT EXISTS "users" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "class" varchar,
  "course" varchar,
  "group" varchar,
  "role" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE IF NOT EXISTS "rooms" (
  "id" int PRIMARY KEY,
  "id_user" int,
  "name" varchar,
  "floor" varchar
);

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" int PRIMARY KEY,
  "id_room" int,
  "id_user" int,
  "time" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "rooms" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("id_room") REFERENCES "rooms" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("id_user") REFERENCES "rooms" ("id");
