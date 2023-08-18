/*
  Warnings:

  - You are about to drop the `_TaskCollaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskCollaborator" DROP CONSTRAINT "_TaskCollaborator_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskCollaborator" DROP CONSTRAINT "_TaskCollaborator_B_fkey";

-- DropTable
DROP TABLE "_TaskCollaborator";

-- CreateTable
CREATE TABLE "_TaskCollaborations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskCollaborations_AB_unique" ON "_TaskCollaborations"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskCollaborations_B_index" ON "_TaskCollaborations"("B");

-- AddForeignKey
ALTER TABLE "_TaskCollaborations" ADD CONSTRAINT "_TaskCollaborations_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskCollaborations" ADD CONSTRAINT "_TaskCollaborations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
