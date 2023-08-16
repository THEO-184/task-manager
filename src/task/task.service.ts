import { Injectable } from '@nestjs/common';
import { CreatTaskDto, QueryListDto, UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EMailService } from 'src/mail/mail.service';
import { EMailPayload } from 'src/mail/interfaces/mail.interfaces';
import { IQueryList, TaskMailPayload } from './interfaces/task.interfaces';
import { Cron } from '@nestjs/schedule';

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

  async sendMail(payload: TaskMailPayload) {
    const message = `
      Hello ${payload.username},
      Your Task <mark>${payload.task_name}</mark> is due on <mark>${payload.due_date}</mark>.
      Kindly complete it before the due date else it will expire.
      Thank You.

      TheoTM App.
    `;
    await this.emailService.sendMail({
      to: payload.email,
      subject: 'Your Task is due',
      html: `<b>${message}</b>`,
    });
  }

  @Cron('0 * * * * *')
  async sendDueDateNotifications() {
    console.log('triggered');
    const ONE_DAY_IN_MILLISECS = 60 * 60 * 24 * 1000;
    const oneDay = new Date(new Date().getTime() + ONE_DAY_IN_MILLISECS);
    const tasks = await this.prisma.task.findMany({
      where: {
        due_date: {
          lte: oneDay,
        },
      },
      include: {
        user: true,
      },
    });

    for (const task of tasks) {
      await this.sendMail({
        due_date: task.due_date,
        email: 'alejandra9@ethereal.email',
        task_name: task.title,
        username: task.user.username,
      });
    }
  }
}
