/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesId",
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoritesId",
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoritesId",
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Favorites";
