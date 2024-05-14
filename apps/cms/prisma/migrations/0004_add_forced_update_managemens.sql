-- CreateTable
CREATE TABLE "ForcedUpdateManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "operateSystem" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
