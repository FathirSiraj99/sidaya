/*
  Warnings:

  - Made the column `activity_template` on table `activity_detail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "activity_detail" DROP CONSTRAINT "activity_detail_activity_template_fkey";

-- AlterTable
ALTER TABLE "activity_detail" ALTER COLUMN "activity_template" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "activity_detail" ADD CONSTRAINT "activity_detail_activity_template_fkey" FOREIGN KEY ("activity_template") REFERENCES "acitivity_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
