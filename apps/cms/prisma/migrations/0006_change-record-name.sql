-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AcstaManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "acstaName" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "scanImageUrl" TEXT NOT NULL,
    "acstaBasicInfoId" INTEGER,
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
    CONSTRAINT "AcstaManagement_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "AplicationMaster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AcstaManagement" ("acstaName", "createdAt", "dateEnd", "dateStart", "id", "managementName", "modeId", "scanColors", "scanHeight", "scanImageUrl", "scanOriginX", "scanOriginY", "scanWidth", "thumbnailUrl", "updatedAt") SELECT "acstaName", "createdAt", "dateEnd", "dateStart", "id", "managementName", "modeId", "scanColors", "scanHeight", "scanImageUrl", "scanOriginX", "scanOriginY", "scanWidth", "thumbnailUrl", "updatedAt" FROM "AcstaManagement";
DROP TABLE "AcstaManagement";
ALTER TABLE "new_AcstaManagement" RENAME TO "AcstaManagement";
CREATE TABLE "new_AplicationMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "termsOfUseId" INTEGER NOT NULL,
    "licenseID" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,
    "outlineUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AplicationMaster_termsOfUseId_fkey" FOREIGN KEY ("termsOfUseId") REFERENCES "TermsOfUse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AplicationMaster_licenseID_fkey" FOREIGN KEY ("licenseID") REFERENCES "License" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AplicationMaster" ("appName", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "licenseID", "outlineUrl", "packageName", "updatedAt") SELECT "appName", "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "licenseID", "outlineUrl", "packageName", "updatedAt" FROM "AplicationMaster";
DROP TABLE "AplicationMaster";
ALTER TABLE "new_AplicationMaster" RENAME TO "AplicationMaster";
CREATE UNIQUE INDEX "AplicationMaster_appName_key" ON "AplicationMaster"("appName");
CREATE TABLE "new_PerformaceManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "performanceTypeMasterId" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "acstaId" INTEGER NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "encryptKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PerformaceManagement_performanceTypeMasterId_fkey" FOREIGN KEY ("performanceTypeMasterId") REFERENCES "PerformaceTypeMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PerformaceManagement_acstaId_fkey" FOREIGN KEY ("acstaId") REFERENCES "AcstaManagement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PerformaceManagement" ("assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "name", "updatedAt") SELECT "assetBundleAndroid", "assetBundleIOS", "createdAt", "encryptKey", "id", "name", "updatedAt" FROM "PerformaceManagement";
DROP TABLE "PerformaceManagement";
ALTER TABLE "new_PerformaceManagement" RENAME TO "PerformaceManagement";
-- PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
