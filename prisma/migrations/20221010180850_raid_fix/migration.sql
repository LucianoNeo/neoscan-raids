/*
  Warnings:

  - The primary key for the `Players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Players` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "raidId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    CONSTRAINT "Players_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Players" ("raidId", "username") SELECT "raidId", "username" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
