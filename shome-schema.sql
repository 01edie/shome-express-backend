-- Enum for expense type
CREATE TYPE "expense_type" AS ENUM (
  'internal_expense',
  'boarder_expense',
  'employee_expense'
);

-- User Table
CREATE TABLE "app_user" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "username" VARCHAR NOT NULL,
  "role" VARCHAR NOT NULL,
  "role_id" INT NOT NULL,
  "password" VARCHAR NOT NULL
);

-- Setup Table
CREATE TABLE "set_up" (
  "id" BIGSERIAL PRIMARY KEY,
  "base_price" VARCHAR NOT NULL
);

-- Expense Class Table
CREATE TABLE "expense_class" (
  "id" BIGSERIAL PRIMARY KEY,
  "class_name" VARCHAR NOT NULL,
  "description" VARCHAR NOT NULL
);

-- Expense Name Table
CREATE TABLE "expense_name" (
  "id" BIGSERIAL PRIMARY KEY,
  "expense_name" VARCHAR NOT NULL,
  "expense_class_id" BIGINT NOT NULL,
  "unit" VARCHAR(10) NOT NULL DEFAULT 'unit',
  "transaction_type" expense_type NOT NULL,
  "is_inventory_item" BOOLEAN NOT NULL
);

-- Expense Table
CREATE TABLE "expense" (
  "id" BIGSERIAL PRIMARY KEY,
  "transaction_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "transaction_type" expense_type NOT NULL,
  "expense_name_id" BIGINT NOT NULL,
  "quantity" INT NOT NULL DEFAULT 1,
  "description" VARCHAR,
  "total_amount" NUMERIC(10,2) NOT NULL,
  "is_assign_later" BOOLEAN,
  "user_unit_amount" NUMERIC(10,2) NOT NULL,
  "boarder_id" BIGINT,
  "employee_id" BIGINT,
  "target_month" DATE,
  "notes" VARCHAR,
  "from_inventory_assignment" BOOLEAN DEFAULT false

);

-- Inventory Table
CREATE TABLE "inventory" (
  "id" BIGSERIAL PRIMARY KEY,
  "expense_id" BIGINT NOT NULL,
  "item_name" VARCHAR NOT NULL,
  "description" VARCHAR,
  "quantity" INT NOT NULL,
  "cost_per_unit" FLOAT4 NOT NULL,
  "in_use" BOOLEAN
);

-- Monthly Bill Table
CREATE TABLE "monthly_bill" (
  "id" BIGSERIAL PRIMARY KEY,
  "boarder_id" BIGINT NOT NULL,
  "payment_from" VARCHAR NOT NULL,
  "bill_month" DATE NOT NULL,
  "base_price" NUMERIC(10,2) NOT NULL,
  "extra_charges_total" NUMERIC(10,2),
  "extra_charges" JSONB,
  "total_amount" NUMERIC(10,2) NOT NULL,
  "paid" BOOLEAN DEFAULT false,
  "payment_date" DATE,
  "notes" VARCHAR
);

-- Boarder Documents Table
CREATE TABLE "boarder_documents" (
  "id" BIGSERIAL PRIMARY KEY,
  "boarder_id" BIGINT NOT NULL,
  "document_name" VARCHAR NOT NULL,
  "document_url" VARCHAR NOT NULL,
  "upload_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "file_type" VARCHAR(50),
  "notes" TEXT
);

-- Employee Documents Table
CREATE TABLE "employee_documents" (
  "id" BIGSERIAL PRIMARY KEY,
  "employee_id" BIGINT NOT NULL,
  "document_name" VARCHAR NOT NULL,
  "document_url" VARCHAR NOT NULL,
  "upload_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "file_type" VARCHAR(50),
  "notes" TEXT
);

-- Internal Documents Table
CREATE TABLE "internal_documents" (
  "id" BIGSERIAL PRIMARY KEY,
  "document_name" VARCHAR NOT NULL,
  "document_url" VARCHAR NOT NULL,
  "upload_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "file_type" VARCHAR(50),
  "uploaded_by" BIGINT NOT NULL,
  "notes" TEXT
);

-- Boarder Table
CREATE TABLE "boarder" (
  "id" BIGSERIAL PRIMARY KEY,
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "dob" DATE NOT NULL,
  "blood_group" VARCHAR(5),
  "contact_number" VARCHAR(10) NOT NULL,
  "emergency_contact" VARCHAR(10),
  "guardian_name" VARCHAR,
  "medical_condition" VARCHAR,
  "special_needs" VARCHAR,
  "allergies" VARCHAR,
  "notes" VARCHAR,
  "active" BOOLEAN DEFAULT true,
  "room_no" INT,
  "joining_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "leaving_date" TIMESTAMPTZ
);

-- Employee Table
CREATE TABLE "employee" (
  "id" BIGSERIAL PRIMARY KEY,
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "employee_role" VARCHAR,
  "salary" NUMERIC(10,2) NOT NULL,
  "contact_number" VARCHAR(10),
  "notes" VARCHAR,
  "active" BOOLEAN DEFAULT true,
  "joining_date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "leaving_date" TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_expense_transaction_type ON "expense" ("transaction_type");
CREATE INDEX idx_expense_name_id ON "expense" ("expense_name_id");
CREATE INDEX idx_expense_transaction_date ON "expense" ("transaction_date");
CREATE INDEX idx_boarder_documents_boarder_id ON "boarder_documents" ("boarder_id");
CREATE INDEX idx_employee_documents_employee_id ON "employee_documents" ("employee_id");
CREATE INDEX idx_monthly_bill_bill_month ON "monthly_bill" ("bill_month");
CREATE INDEX idx_monthly_bill_paid ON "monthly_bill" ("paid");

-- Foreign Key References
ALTER TABLE "expense" ADD CONSTRAINT fk_expense_name_id FOREIGN KEY ("expense_name_id") REFERENCES "expense_name" ("id");
ALTER TABLE "expense" ADD CONSTRAINT fk_boarder_id FOREIGN KEY ("boarder_id") REFERENCES "boarder" ("id");
ALTER TABLE "expense" ADD CONSTRAINT fk_employee_id FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");

ALTER TABLE "monthly_bill" ADD CONSTRAINT fk_boarder_id FOREIGN KEY ("boarder_id") REFERENCES "boarder" ("id");

ALTER TABLE "boarder_documents" ADD CONSTRAINT fk_boarder_documents_boarder_id FOREIGN KEY ("boarder_id") REFERENCES "boarder" ("id");
ALTER TABLE "employee_documents" ADD CONSTRAINT fk_employee_documents_employee_id FOREIGN KEY ("employee_id") REFERENCES "employee" ("id");

ALTER TABLE "internal_documents" ADD CONSTRAINT fk_internal_documents_uploaded_by FOREIGN KEY ("uploaded_by") REFERENCES "app_user" ("id");

ALTER TABLE "inventory" ADD CONSTRAINT fk_inventory_expense_id FOREIGN KEY ("expense_id") REFERENCES "expense" ("id");

ALTER TABLE "expense_name" ADD CONSTRAINT fk_expense_class_id FOREIGN KEY ("expense_class_id") REFERENCES "expense_class" ("id");
