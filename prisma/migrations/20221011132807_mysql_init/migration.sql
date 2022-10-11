-- CreateTable
CREATE TABLE `Raid` (
    `gymId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `pokemonName` VARCHAR(191) NOT NULL,
    `pokemonImg` VARCHAR(191) NOT NULL,
    `gym` VARCHAR(191) NOT NULL,
    `hourStart` DATETIME(3) NOT NULL,
    `hourEnd` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gymTeam` INTEGER NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `lon` VARCHAR(191) NOT NULL,
    `raidLevel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players` (
    `raidId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `team` VARCHAR(191) NOT NULL,
    `playerLevel` INTEGER NOT NULL,
    `playType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_raidId_fkey` FOREIGN KEY (`raidId`) REFERENCES `Raid`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
