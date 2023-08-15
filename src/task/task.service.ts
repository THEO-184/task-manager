import { Injectable } from '@nestjs/common';
import {
  CreatTaskDto,
  IQueryList,
  QueryListDto,
  UpdateTaskDto,
} from './dto/task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EMailService } from 'src/mail/mail.service';
import { EMailPayload } from 'src/mail/interfaces/mail.interfaces';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private emailService: EMailService,
  ) {}

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
    if (query.priority) {
      queryObj.priority = query.priority;
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

    await this.emailService.sendMail({
      to: 'vada21@ethereal.email',
      text: 'Welcome',
      subject: 'Your Task is due',
      html: '<b>Hello Dear User, Your task is due</b>',
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

  async sendMail(payload: EMailPayload) {
    await this.emailService.sendMail({
      to: 'vada21@ethereal.email',
      text: 'Welcome',
      subject: 'Your Task is due',
      html: '<b>Hello Dear User, Your task is due</b>',
    });
  }
}
