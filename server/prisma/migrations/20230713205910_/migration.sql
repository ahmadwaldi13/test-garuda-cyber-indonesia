/*
  Warnings:

  - You are about to alter the column `createdAt` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `createdAt` TIMESTAMP NOT NULL;
