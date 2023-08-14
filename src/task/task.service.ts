import { Injectable } from '@nestjs/common';
import {
  CreatTaskDto,
  IQueryList,
  QueryListDto,
  UpdateTaskDto,
} from './dto/task.dto';
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

  async getUserTasks(userId: string, query: QueryListDto) {
    const queryObj: Partial<IQueryList> = {};
    if (query.category) {
      queryObj.category = query.category;
    }
    if (query.status) {
      queryObj.status = query.status;
    }

    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
        ...queryObj,
      },
      orderBy: {
        updatedAt: 'desc',
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
    await this.prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        ...dto,
      },
    });

    return { message: 'task updated successfully' };
  }

  async deleteTask(taskId: string, userId: string) {
    await this.prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });

    return { message: 'task deleted successfully' };
  }
}
