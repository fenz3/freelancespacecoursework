/*
  Warnings:

  - Added the required column `creatorId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Offer_creatorId_idx" ON "Offer"("creatorId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
