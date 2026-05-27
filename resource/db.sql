CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz
);

CREATE TABLE "refresh_token" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "token" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "expired_at" timestamptz,
  "revoked_at" timestamptz
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar NOT NULL,
  "description" text,
  "category" varchar,
  "price" numeric(12,2) NOT NULL,
  "img_url" varchar,
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz
);

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "table_id" uuid,
  "status" varchar,
  "total_amount" numeric(12,2),
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz
);

CREATE TABLE "order_items" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "order_id" uuid,
  "product_id" uuid,
  "qty" int NOT NULL,
  "price" numeric(12,2) NOT NULL,
  "subtotal" numeric(12,2),
  "notes" text,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "order_id" uuid,
  "method" varchar,
  "amount" numeric(12,2),
  "status" varchar,
  "paid_at" timestamptz,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "tables" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar,
  "capacity" int,
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz
);

CREATE TABLE "ratings" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "order_id" uuid,
  "rating" int,
  "comment" text,
  "created_at" timestamptz DEFAULT (now())
);

COMMENT ON COLUMN "orders"."status" IS 'pending, paid, canceled';

COMMENT ON COLUMN "payments"."method" IS 'midtrans, cash';

COMMENT ON COLUMN "payments"."status" IS 'pending, success, failed';

COMMENT ON COLUMN "ratings"."rating" IS '1-5';

ALTER TABLE "refresh_token" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "orders" ADD FOREIGN KEY ("table_id") REFERENCES "tables" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ratings" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;