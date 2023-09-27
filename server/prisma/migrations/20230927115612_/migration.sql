/*
  Warnings:

  - You are about to drop the column `used` on the `Referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `used`,
    ADD COLUMN `usedByUserId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `referralCodeUsedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_referralCodeUsedById_fkey` FOREIGN KEY (`referralCodeUsedById`) REFERENCES `Referral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
