-- CreateTable
CREATE TABLE "problem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activity_templateId" TEXT,

    CONSTRAINT "problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_activity_templateId_fkey" FOREIGN KEY ("activity_templateId") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
