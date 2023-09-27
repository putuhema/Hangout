/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `PointsTransaction` MODIFY `points` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_ownerId_key` ON `Referral`(`ownerId`);
