-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_client_id_fkey";

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "client_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
