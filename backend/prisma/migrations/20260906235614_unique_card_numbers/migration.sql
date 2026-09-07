/*
  Warnings:

  - A unique constraint covering the columns `[setId,cardNumber]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_setId_cardNumber_key" ON "Card"("setId", "cardNumber");
