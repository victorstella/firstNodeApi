-- DropIndex
DROP INDEX `User.uuid_unique` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdBy` VARCHAR(191),
    ADD COLUMN `updateBy` VARCHAR(191);
