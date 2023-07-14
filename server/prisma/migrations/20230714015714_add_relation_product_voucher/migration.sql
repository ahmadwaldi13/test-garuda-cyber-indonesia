/*
  Warnings:

  - You are about to drop the column `customer_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `voucher_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `voucher_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `customer_id`,
    DROP COLUMN `product_id`,
    MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
