-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "portfolioItems" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "profession" TEXT NOT NULL DEFAULT '';
