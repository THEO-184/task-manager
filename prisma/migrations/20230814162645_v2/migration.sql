-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('high', 'medium', 'low');

-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'progress';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '30 days',
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'low';
