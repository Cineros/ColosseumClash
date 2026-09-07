/*
  Warnings:

  - Added the required column `artist` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryType` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "armor" INTEGER,
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "creator" TEXT NOT NULL,
ADD COLUMN     "damage" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "health" INTEGER,
ADD COLUMN     "primaryType" TEXT NOT NULL,
ADD COLUMN     "rarity" TEXT,
ADD COLUMN     "speed" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "tribe" TEXT;
