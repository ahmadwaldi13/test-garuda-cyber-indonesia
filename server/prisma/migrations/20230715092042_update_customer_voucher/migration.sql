/*
  Warnings:

  - You are about to drop the column `customer_id` on the `voucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_customer_id_fkey`;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `customer_id`;
