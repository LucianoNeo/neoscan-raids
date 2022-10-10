-- CreateTable
CREATE TABLE "Raid" (
    "gymId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "playType" TEXT NOT NULL,
    "pokemonName" TEXT NOT NULL,
    "pokemonImg" TEXT NOT NULL,
    "gym" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Players" (
    "raidId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    CONSTRAINT "Players_raidId_fkey" FOREIGN KEY ("raidId") REFERENCES "Raid" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
