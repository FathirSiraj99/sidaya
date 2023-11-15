/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "activity_detail" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "activity_template" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "area" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "problem" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "problem_detail" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
