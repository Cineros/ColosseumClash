-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "setId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
