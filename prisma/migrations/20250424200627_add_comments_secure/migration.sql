-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "honeypot" TEXT DEFAULT ''
);
INSERT INTO "new_Comment" ("createdAt", "id", "name", "slug", "text") SELECT "createdAt", "id", "name", "slug", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_slug_idx" ON "Comment"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
