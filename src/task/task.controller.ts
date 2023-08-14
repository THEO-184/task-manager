import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { CreatTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { GetUser } from 'src/profile/decorators/getUser.decorator';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getUserTasks(@GetUser('sub') userId: string) {
    return this.taskService.getUserTasks(userId);
  }

  @Put(':id')
  updateTask(
    @GetUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(dto, taskId, userId);
  }

  @Post()
  createTast(@Body() dto: CreatTaskDto, @GetUser('sub') id: never) {
    return this.taskService.createTask(dto, id);
  }
}
