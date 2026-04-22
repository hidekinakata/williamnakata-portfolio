/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTranslation" DROP CONSTRAINT "PostTranslation_postId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostTranslation";
