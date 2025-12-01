-- Add amazonProductId column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'amazonProductId'
  ) THEN
    ALTER TABLE "products" ADD COLUMN "amazonProductId" TEXT;
  END IF;
END $$;

-- Set default amazonProductId for all existing products
UPDATE "products" SET "amazonProductId" = 'B085LT31HP' WHERE "amazonProductId" IS NULL;

-- Make amazonProductId unique and not null
ALTER TABLE "products" 
  ALTER COLUMN "amazonProductId" SET NOT NULL,
  ADD CONSTRAINT "products_amazonProductId_key" UNIQUE ("amazonProductId");

-- Remove old columns
ALTER TABLE "products" 
  DROP COLUMN IF EXISTS "name",
  DROP COLUMN IF EXISTS "slug",
  DROP COLUMN IF EXISTS "brand",
  DROP COLUMN IF EXISTS "description",
  DROP COLUMN IF EXISTS "price",
  DROP COLUMN IF EXISTS "link",
  DROP COLUMN IF EXISTS "image";
