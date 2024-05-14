-- AlterTable
ALTER TABLE "User" ADD COLUMN "lastLogin" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KeyToken" (
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
INSERT INTO "new_KeyToken" ("createdAt", "id", "privateKey", "publicKey", "refreshToken", "refreshTokensUsed", "updatedAt") SELECT "createdAt", "id", "privateKey", "publicKey", "refreshToken", "refreshTokensUsed", "updatedAt" FROM "KeyToken";
DROP TABLE "KeyToken";
ALTER TABLE "new_KeyToken" RENAME TO "KeyToken";
CREATE UNIQUE INDEX "KeyToken_userId_key" ON "KeyToken"("userId");
CREATE UNIQUE INDEX "KeyToken_publicKey_key" ON "KeyToken"("publicKey");
CREATE UNIQUE INDEX "KeyToken_privateKey_key" ON "KeyToken"("privateKey");
CREATE UNIQUE INDEX "KeyToken_refreshToken_key" ON "KeyToken"("refreshToken");
-- PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
