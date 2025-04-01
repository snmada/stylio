/*
  Warnings:

  - You are about to drop the column `hex_code` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `color_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Subcategory` table. All the data in the column will be lost.
  - Added the required column `hexCode` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_color_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategory_id_fkey";

-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_category_id_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "hex_code",
ADD COLUMN     "hexCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color_id",
DROP COLUMN "subcategory_id",
ADD COLUMN     "colorId" TEXT NOT NULL,
ADD COLUMN     "subcategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
