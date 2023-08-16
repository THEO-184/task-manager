-- CreateTable
CREATE TABLE "_TaskCollaborator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskCollaborator_AB_unique" ON "_TaskCollaborator"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskCollaborator_B_index" ON "_TaskCollaborator"("B");

-- AddForeignKey
ALTER TABLE "_TaskCollaborator" ADD CONSTRAINT "_TaskCollaborator_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskCollaborator" ADD CONSTRAINT "_TaskCollaborator_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
