/*
  Warnings:

  - Added the required column `totalPrice` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "totalPrice" INTEGER NOT NULL;
