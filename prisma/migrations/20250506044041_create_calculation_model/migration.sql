-- CreateTable
CREATE TABLE "calculations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operation" TEXT NOT NULL,
    "operand1" TEXT NOT NULL,
    "operand2" TEXT,
    "result" TEXT NOT NULL,

    CONSTRAINT "calculations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "created_at_index" ON "calculations"("createdAt");

-- CreateIndex
CREATE INDEX "operation_index" ON "calculations"("operation");
