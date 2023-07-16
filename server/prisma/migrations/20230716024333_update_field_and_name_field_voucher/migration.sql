/*
  Warnings:

  - You are about to drop the column `createdAt` on the `voucher` table. All the data in the column will be lost.
  - Added the required column `expired_voucher` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_voucher` to the `voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `createdAt`,
    ADD COLUMN `expired_voucher` DATETIME NOT NULL,
    ADD COLUMN `start_voucher` DATETIME NOT NULL;
