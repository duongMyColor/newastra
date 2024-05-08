-- Create a new table with the desired structure
CREATE TABLE AcstaManagement_new (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "managementName" TEXT NOT NULL,
    "acstaName" TEXT NOT NULL,
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
    "dateEnd" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcstaManagement_applicationID_fkey" FOREIGN KEY ("applicationID") REFERENCES "AplicationMaster" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Copy all data from the old table to the new table
INSERT INTO AcstaManagement_new SELECT * FROM AcstaManagement;

-- Delete the old table
DROP TABLE AcstaManagement;

-- Rename the new table to the old table's name
ALTER TABLE AcstaManagement_new RENAME TO AcstaManagement;