/*
  Warnings:

  - You are about to drop the column `customer_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to alter the column `start_voucher` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expired_voucher` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_customer_id_fkey`;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `code_voucher` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `customer_id`,
    MODIFY `start_voucher` DATETIME NOT NULL,
    MODIFY `expired_voucher` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_code_voucher_fkey` FOREIGN KEY (`code_voucher`) REFERENCES `voucher`(`code_voucher`) ON DELETE SET NULL ON UPDATE CASCADE;
