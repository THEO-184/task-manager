import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
