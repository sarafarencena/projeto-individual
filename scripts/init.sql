CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255),
  "class" VARCHAR(10),
  "course" VARCHAR(100),
  "group" VARCHAR(10),
  "role" VARCHAR(50) DEFAULT 'student',
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "rooms" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "code" VARCHAR(10) NOT NULL UNIQUE,
  "name" VARCHAR(100),
  "floor" VARCHAR(20),
  "capacity" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "room_id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "time_slot" VARCHAR(20) NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign Keys
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey"
FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE CASCADE;

ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS "idx_bookings_room_time" ON "bookings" ("room_id", "time_slot");
CREATE INDEX IF NOT EXISTS "idx_bookings_user" ON "bookings" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_rooms_code" ON "rooms" ("code");
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");

