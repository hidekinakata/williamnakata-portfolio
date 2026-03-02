/*
  Warnings:

  - You are about to drop the column `cvUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `cvUrlEn` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "cvUrl",
DROP COLUMN "cvUrlEn";

-- AlterTable
ALTER TABLE "ProfileTranslation" ADD COLUMN     "cvUrl" TEXT;
