/*
  Warnings:

  - You are about to alter the column `createdAt` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_voucher_id_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `voucher_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `voucher` MODIFY `createdAt` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `voucher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
