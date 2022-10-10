/*
  Warnings:

  - You are about to alter the column `hourEnd` on the `Raid` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `hourStart` on the `Raid` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - Added the required column `lat` to the `Raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `Raid` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Raid" (
    "gymId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "playType" TEXT NOT NULL,
    "pokemonName" TEXT NOT NULL,
    "pokemonImg" TEXT NOT NULL,
    "gym" TEXT NOT NULL,
    "hourStart" DATETIME NOT NULL,
    "hourEnd" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "team" INTEGER NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);
INSERT INTO "new_Raid" ("createdAt", "gym", "gymId", "hourEnd", "hourStart", "id", "playType", "pokemonImg", "pokemonName") SELECT "createdAt", "gym", "gymId", "hourEnd", "hourStart", "id", "playType", "pokemonImg", "pokemonName" FROM "Raid";
DROP TABLE "Raid";
ALTER TABLE "new_Raid" RENAME TO "Raid";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
