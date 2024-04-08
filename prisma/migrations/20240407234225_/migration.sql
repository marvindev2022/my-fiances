-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_cashIn" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_cashOut" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cashIn_AB_unique" ON "_cashIn"("A", "B");

-- CreateIndex
CREATE INDEX "_cashIn_B_index" ON "_cashIn"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_cashOut_AB_unique" ON "_cashOut"("A", "B");

-- CreateIndex
CREATE INDEX "_cashOut_B_index" ON "_cashOut"("B");

-- AddForeignKey
ALTER TABLE "_cashIn" ADD CONSTRAINT "_cashIn_A_fkey" FOREIGN KEY ("A") REFERENCES "Cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cashIn" ADD CONSTRAINT "_cashIn_B_fkey" FOREIGN KEY ("B") REFERENCES "Income"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cashOut" ADD CONSTRAINT "_cashOut_A_fkey" FOREIGN KEY ("A") REFERENCES "Cash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cashOut" ADD CONSTRAINT "_cashOut_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
