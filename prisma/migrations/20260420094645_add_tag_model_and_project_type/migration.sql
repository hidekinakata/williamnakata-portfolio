-- CreateEnum
CREATE TYPE "Language" AS ENUM ('pt_BR', 'en');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('personal', 'professional');

-- AlterTable: Profile — add key and createdAt
ALTER TABLE "Profile"
  ADD COLUMN "key" TEXT NOT NULL DEFAULT 'default',
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex: Profile key unique
CREATE UNIQUE INDEX "Profile_key_key" ON "Profile"("key");

-- AlterTable: ProfileTranslation — convert language TEXT -> Language enum
-- Values in DB are 'pt-BR' and 'en'; enum stores 'pt_BR' and 'en' (pt-BR is @map)
ALTER TABLE "ProfileTranslation"
  ALTER COLUMN "language" TYPE "Language"
  USING (CASE "language"
    WHEN 'pt-BR' THEN 'pt_BR'::"Language"
    WHEN 'en'    THEN 'en'::"Language"
    ELSE 'en'::"Language"
  END);

-- CreateIndex: ProfileTranslation language
CREATE INDEX "ProfileTranslation_language_idx" ON "ProfileTranslation"("language");

-- AlterTable: ExperienceTranslation — convert language TEXT -> Language enum
ALTER TABLE "ExperienceTranslation"
  ALTER COLUMN "language" TYPE "Language"
  USING (CASE "language"
    WHEN 'pt-BR' THEN 'pt_BR'::"Language"
    WHEN 'en'    THEN 'en'::"Language"
    ELSE 'en'::"Language"
  END);

-- CreateIndex: ExperienceTranslation language
CREATE INDEX "ExperienceTranslation_language_idx" ON "ExperienceTranslation"("language");

-- CreateIndex: Experience startDate
CREATE INDEX "Experience_startDate_idx" ON "Experience"("startDate" DESC);

-- AlterTable: Project — add type, remove tags array
ALTER TABLE "Project"
  ADD COLUMN "type" "ProjectType" NOT NULL DEFAULT 'personal';

ALTER TABLE "Project"
  DROP COLUMN "tags";

-- CreateIndex: Project createdAt and type
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt" DESC);
CREATE INDEX "Project_type_idx" ON "Project"("type");

-- AlterTable: ProjectTranslation — convert language TEXT -> Language enum
ALTER TABLE "ProjectTranslation"
  ALTER COLUMN "language" TYPE "Language"
  USING (CASE "language"
    WHEN 'pt-BR' THEN 'pt_BR'::"Language"
    WHEN 'en'    THEN 'en'::"Language"
    ELSE 'en'::"Language"
  END);

-- CreateIndex: ProjectTranslation language
CREATE INDEX "ProjectTranslation_language_idx" ON "ProjectTranslation"("language");

-- AlterTable: PostTranslation — convert language TEXT -> Language enum
ALTER TABLE "PostTranslation"
  ALTER COLUMN "language" TYPE "Language"
  USING (CASE "language"
    WHEN 'pt-BR' THEN 'pt_BR'::"Language"
    WHEN 'en'    THEN 'en'::"Language"
    ELSE 'en'::"Language"
  END);

-- CreateIndex: PostTranslation language
CREATE INDEX "PostTranslation_language_idx" ON "PostTranslation"("language");

-- CreateTable: Tag
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Tag slug unique
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateTable: ProjectTag (junction)
CREATE TABLE "ProjectTag" (
    "projectId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("projectId","tagId")
);

-- AddForeignKey: ProjectTag -> Project
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: ProjectTag -> Tag
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_tagId_fkey"
  FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
