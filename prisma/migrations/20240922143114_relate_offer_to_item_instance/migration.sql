-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_itemId_fkey";

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItemInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
