/*
  Warnings:

  - You are about to drop the column `voucher_id` on the `products` table. All the data in the column will be lost.
  - Added the required column `password` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_voucher_id_fkey`;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `password` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `voucher_id`;

-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `customer_id` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
