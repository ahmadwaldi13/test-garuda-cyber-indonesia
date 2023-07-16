/*
  Warnings:

  - Made the column `createdAt` on table `voucher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `createdAt` DATETIME NOT NULL;
