-- CreateTable
CREATE TABLE "KeyToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "publicKey" TEXT,
    "privateKey" TEXT,
    "refreshToken" TEXT,
    "refreshTokensUsed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "KeyToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_userId_key" ON "KeyToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_publicKey_key" ON "KeyToken"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_privateKey_key" ON "KeyToken"("privateKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_refreshToken_key" ON "KeyToken"("refreshToken");
