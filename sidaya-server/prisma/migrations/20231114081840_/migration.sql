-- AlterTable
ALTER TABLE "activity_detail" ALTER COLUMN "nth_day" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "area" ADD COLUMN     "nth_day" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "problem_detail" ALTER COLUMN "nth_day" SET DEFAULT 1;
