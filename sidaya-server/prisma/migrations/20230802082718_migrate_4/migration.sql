/*
  Warnings:

  - You are about to drop the column `activity_templateId` on the `problem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "problem" DROP CONSTRAINT "problem_activity_templateId_fkey";

-- AlterTable
ALTER TABLE "problem" DROP COLUMN "activity_templateId",
ADD COLUMN     "activityTemplateId" TEXT;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_activityTemplateId_fkey" FOREIGN KEY ("activityTemplateId") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
