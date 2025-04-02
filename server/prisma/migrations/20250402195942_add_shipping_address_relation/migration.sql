/*
  Warnings:

  - You are about to drop the column `userId` on the `ShippingAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ShippingAddress" DROP CONSTRAINT "ShippingAddress_userId_fkey";

-- DropIndex
DROP INDEX "ShippingAddress_userId_key";

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_shippingAddressId_key" ON "User"("shippingAddressId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
