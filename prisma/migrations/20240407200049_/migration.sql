/*
  Warnings:

  - You are about to drop the column `boletoId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Boleto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Boleto" DROP CONSTRAINT "Boleto_payerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_boletoId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "boletoId",
ADD COLUMN     "bankSlipId" TEXT;

-- DropTable
DROP TABLE "Boleto";

-- CreateTable
CREATE TABLE "BankSlip" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "payerId" TEXT NOT NULL,

    CONSTRAINT "BankSlip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bankSlipId_fkey" FOREIGN KEY ("bankSlipId") REFERENCES "BankSlip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankSlip" ADD CONSTRAINT "BankSlip_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
