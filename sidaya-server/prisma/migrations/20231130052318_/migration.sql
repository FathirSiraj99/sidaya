-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Fish" AS ENUM ('LELE', 'TONGKOL');

-- CreateTable
CREATE TABLE "activity_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fish" "Fish",
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "activity_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_detail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "time" TEXT NOT NULL,
    "turn" INTEGER NOT NULL,
    "nth_day" INTEGER NOT NULL DEFAULT 1,
    "formula" JSONB,
    "activity_template" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "activity_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activity_template_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_detail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nth_day" INTEGER NOT NULL DEFAULT 1,
    "time" TEXT NOT NULL,
    "turn" TEXT NOT NULL,
    "formula" JSONB,
    "problem_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "problem_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "feed" DOUBLE PRECISION DEFAULT 0,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION DEFAULT 0,
    "water_level" INTEGER DEFAULT 0,
    "is_active" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "activity_template_id" TEXT,
    "activity_detail_id" TEXT,
    "user_id" INTEGER,
    "problem_id" TEXT,
    "problem_detail_id" TEXT,
    "nth_day" INTEGER NOT NULL DEFAULT 1,
    "fish" "Fish",

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "activity_detail" ADD CONSTRAINT "activity_detail_activity_template_fkey" FOREIGN KEY ("activity_template") REFERENCES "activity_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_activity_template_id_fkey" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_detail" ADD CONSTRAINT "problem_detail_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_activity_template_id_fkey" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_activity_detail_id_fkey" FOREIGN KEY ("activity_detail_id") REFERENCES "activity_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_problem_detail_id_fkey" FOREIGN KEY ("problem_detail_id") REFERENCES "problem_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
