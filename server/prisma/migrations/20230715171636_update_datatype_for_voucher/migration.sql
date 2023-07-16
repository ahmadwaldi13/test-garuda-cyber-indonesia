/*
  Warnings:

  - You are about to alter the column `createdAt` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `createdAt` DATETIME NOT NULL;
