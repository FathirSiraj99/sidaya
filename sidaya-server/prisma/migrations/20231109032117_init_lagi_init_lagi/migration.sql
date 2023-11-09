/*
  Warnings:

  - You are about to drop the column `isActive` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `area` table. All the data in the column will be lost.
  - You are about to drop the `ProblemDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `acitivity_template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProblemDetail" DROP CONSTRAINT "ProblemDetail_problemId_fkey";

-- DropForeignKey
ALTER TABLE "activity_detail" DROP CONSTRAINT "activity_detail_activity_template_fkey";

-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_activity_template_id_fkey";

-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_problemId_fkey";

-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_userId_fkey";

-- DropForeignKey
ALTER TABLE "problem" DROP CONSTRAINT "problem_activity_template_id_fkey";

-- AlterTable
ALTER TABLE "area" DROP COLUMN "isActive",
DROP COLUMN "problemId",
DROP COLUMN "userId",
ADD COLUMN     "is_active" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "problem_detail_id" TEXT,
ADD COLUMN     "problem_id" TEXT,
ADD COLUMN     "user_id" INTEGER;

-- DropTable
DROP TABLE "ProblemDetail";

-- DropTable
DROP TABLE "acitivity_template";

-- CreateTable
CREATE TABLE "activity_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_detail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nth_day" INTEGER NOT NULL DEFAULT 0,
    "time" TEXT NOT NULL,
    "turn" TEXT NOT NULL,
    "formula" JSONB,
    "problem_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problem_detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity_detail" ADD CONSTRAINT "activity_detail_activity_template_fkey" FOREIGN KEY ("activity_template") REFERENCES "activity_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_activity_template_id_fkey" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_problem_detail_id_fkey" FOREIGN KEY ("problem_detail_id") REFERENCES "problem_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_activity_template_id_fkey" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_detail" ADD CONSTRAINT "problem_detail_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
