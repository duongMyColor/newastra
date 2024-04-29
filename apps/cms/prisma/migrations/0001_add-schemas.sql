-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'READ_ONLY',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "UserRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeyToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "publicKey" TEXT,
    "privateKey" TEXT,
    "refreshToken" TEXT,
    "refreshTokensUsed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "KeyToken_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AplicationMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appName" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "termsOfUseID" INTEGER NOT NULL,
    "licenseID" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "outlineUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AplicationMaster_termsOfUseID_fkey" FOREIGN KEY ("termsOfUseID") REFERENCES "TermsOfUse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AplicationMaster_licenseID_fkey" FOREIGN KEY ("licenseID") REFERENCES "License" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcstaManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "acstaName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "applicationID" INTEGER NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "scanImageUrl" TEXT NOT NULL,
    "acstaBasicInfoID" INTEGER,
    "scanOriginX" REAL NOT NULL,
    "scanOriginY" REAL NOT NULL,
    "scanWidth" REAL NOT NULL,
    "scanHeight" REAL NOT NULL,
    "scanColors" TEXT NOT NULL,
    "modeId" INTEGER,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcstaManagement_applicationID_fkey" FOREIGN KEY ("applicationID") REFERENCES "AplicationMaster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PerformaceTypeMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PerformaceManagement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "performanceTypeMasterID" INTEGER NOT NULL,
    "assetBundleIOS" TEXT NOT NULL,
    "acstaID" INTEGER NOT NULL,
    "assetBundleAndroid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PerformaceManagement_performanceTypeMasterID_fkey" FOREIGN KEY ("performanceTypeMasterID") REFERENCES "PerformaceTypeMaster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PerformaceManagement_acstaID_fkey" FOREIGN KEY ("acstaID") REFERENCES "AcstaManagement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermsOfUse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memo" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "License" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memo" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_userID_key" ON "KeyToken"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_publicKey_key" ON "KeyToken"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_privateKey_key" ON "KeyToken"("privateKey");

-- CreateIndex
CREATE UNIQUE INDEX "KeyToken_refreshToken_key" ON "KeyToken"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "AplicationMaster_appName_key" ON "AplicationMaster"("appName");

-- CreateIndex
CREATE UNIQUE INDEX "AplicationMaster_termsOfUseID_key" ON "AplicationMaster"("termsOfUseID");

-- CreateIndex
CREATE UNIQUE INDEX "AplicationMaster_licenseID_key" ON "AplicationMaster"("licenseID");
