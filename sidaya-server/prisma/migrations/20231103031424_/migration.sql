/*
  Warnings:

  - You are about to drop the column `area_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_area_id_fkey";

-- AlterTable
ALTER TABLE "area" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "area_id";

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
