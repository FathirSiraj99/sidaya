-- AlterTable
ALTER TABLE "area" ADD COLUMN     "problemId" TEXT;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
