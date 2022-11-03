-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PENDING', 'COMPLETE');

-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';
