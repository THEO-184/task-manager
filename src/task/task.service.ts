import { Injectable } from '@nestjs/common';
import { CreatTaskDto, UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreatTaskDto, userId: never) {
    const task = await this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    });
    return { message: 'Task created Successfully' };
  }

  async getUserTasks(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
            id: true,
            username: true,
          },
        },
      },
    });

    return { count: tasks.length, data: tasks };
  }

  async updateTask(dto: UpdateTaskDto, taskId: string, userId: string) {
    const task = await this.prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        ...dto,
      },
    });

    return { message: 'task updated successfully', task };
  }
}
