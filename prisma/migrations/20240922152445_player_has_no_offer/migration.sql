/*
  Warnings:

  - You are about to drop the column `playerId` on the `Offer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_playerId_fkey";

-- AlterTable
ALTER TABLE "ItemInstance" ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "playerId";
