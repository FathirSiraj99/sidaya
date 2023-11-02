-- AlterTable
ALTER TABLE "area" ADD COLUMN     "activity_detail_id" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "area_id" TEXT;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_activity_detail_id_fkey" FOREIGN KEY ("activity_detail_id") REFERENCES "activity_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
