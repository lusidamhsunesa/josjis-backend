const pool = require('./config/db');

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "name" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "role" VARCHAR DEFAULT 'admin',
    "is_active" BOOLEAN DEFAULT true,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "refresh_token" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "user_id" UUID NOT NULL,
    "token" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    "expired_at" TIMESTAMPTZ(6),
    "revoked_at" TIMESTAMPTZ(6),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "order_items" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "order_id" UUID,
    "product_id" UUID,
    "qty" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "orders" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "table_id" UUID,
    "status" VARCHAR,
    "total_amount" DECIMAL(12,2),
    "is_active" BOOLEAN DEFAULT true,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "payments" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "order_id" UUID,
    "method" VARCHAR,
    "amount" DECIMAL(12,2),
    "status" VARCHAR,
    "midtrans_token" VARCHAR,
    "paid_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "products" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "category" VARCHAR,
    "price" DECIMAL(12,2) NOT NULL,
    "img_keys" VARCHAR[],
    "is_active" BOOLEAN DEFAULT true,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "ratings" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "order_id" UUID,
    "rating" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  CREATE TABLE IF NOT EXISTS "tables" (
    "id" UUID NOT NULL DEFAULT (gen_random_uuid()),
    "name" VARCHAR,
    "capacity" INTEGER,
    "is_active" BOOLEAN DEFAULT true,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMPTZ(6) DEFAULT (CURRENT_TIMESTAMP),
    PRIMARY KEY ("id")
  );

  -- Membuat index (jika belum ada)
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" ("email");

  -- Menambahkan Foreign Keys (Menggunakan ALTER TABLE)
  DO $$ 
  BEGIN 
    BEGIN
      ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;

    BEGIN
      ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;

    BEGIN
      ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;

    BEGIN
      ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;

    BEGIN
      ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;

    BEGIN
      ALTER TABLE "ratings" ADD CONSTRAINT "ratings_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;
    EXCEPTION WHEN duplicate_object THEN NULL; END;
  END $$;
`;

const runSetup = async () => {
  try {
    console.log('⏳ Sedang mengeksekusi query database...');
    await pool.query(createTablesQuery);
    console.log('✅ Berhasil! Semua tabel dan relasi sudah dibuat di database.');
  } catch (err) {
    console.error('❌ Gagal membuat tabel:', err.message);
  } finally {
    pool.end(); // Menutup koneksi ke database setelah selesai
  }
};

runSetup();