/*
  Warnings:

  - You are about to drop the column `skillsRequired` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "skillsRequired",
ADD COLUMN     "serviceDetails" TEXT[];
