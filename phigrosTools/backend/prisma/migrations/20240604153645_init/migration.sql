/*
  Warnings:

  - You are about to drop the column `score` on the `UserMusicScore` table. All the data in the column will be lost.
  - Added the required column `accuracy` to the `UserMusicScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMusicScore" DROP COLUMN "score",
ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL;
