-- CreateTable
CREATE TABLE "IdLastestOfRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idLastest" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AcstaManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "acstaName" TEXT NOT NULL,
    "applicationID" INTEGER NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "scanImageUrl" TEXT NOT NULL,
    "acstaBasicInfoID" INTEGER,
    "scanOriginX" REAL,
    "scanOriginY" REAL,
    "scanWidth" REAL,
    "scanHeight" REAL,
    "scanColors" TEXT,
    "modeId" INTEGER,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcstaManagement_applicationID_fkey" FOREIGN KEY ("applicationID") REFERENCES "AplicationMaster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AcstaManagement" ("acstaBasicInfoID", "acstaName", "applicationID", "createdAt", "dateEnd", "dateStart", "id", "managementName", "modeId", "scanColors", "scanHeight", "scanImageUrl", "scanOriginX", "scanOriginY", "scanWidth", "thumbnailUrl", "updatedAt") SELECT "acstaBasicInfoID", "acstaName", "applicationID", "createdAt", "dateEnd", "dateStart", "id", "managementName", "modeId", "scanColors", "scanHeight", "scanImageUrl", "scanOriginX", "scanOriginY", "scanWidth", "thumbnailUrl", "updatedAt" FROM "AcstaManagement";
DROP TABLE "AcstaManagement";
ALTER TABLE "new_AcstaManagement" RENAME TO "AcstaManagement";
-- PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
