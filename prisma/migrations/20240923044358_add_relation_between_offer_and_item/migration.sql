/*
  Warnings:

  - Added the required column `itemTypeId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "itemTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
