-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "due_date" SET DEFAULT CURRENT_TIMESTAMP + interval '30 days';
