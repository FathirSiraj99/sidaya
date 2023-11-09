-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "Role" NOT NULL DEFAULT 'USER';
