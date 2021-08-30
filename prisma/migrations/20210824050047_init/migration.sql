/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `user_address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `user_address_ibfk_1`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- DropTable
DROP TABLE `user_address`;

-- CreateTable
CREATE TABLE `User_Address` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Address.user_id_unique`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User.uuid_unique` ON `User`(`uuid`);

-- AddForeignKey
ALTER TABLE `User_Address` ADD FOREIGN KEY (`user_id`) REFERENCES `User`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
