/*
  Warnings:

  - You are about to alter the column `start_voucher` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expired_voucher` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `start_voucher` DATETIME NOT NULL,
    MODIFY `expired_voucher` DATETIME NOT NULL;
