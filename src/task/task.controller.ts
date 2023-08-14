import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { CreatTaskDto, QueryListDto, UpdateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { GetUser } from 'src/profile/decorators/getUser.decorator';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getUserTasks(@GetUser('sub') userId: string, @Query() query: QueryListDto) {
    return this.taskService.getUserTasks(userId, query);
  }

  @Put(':id')
  updateTask(
    @GetUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(dto, taskId, userId);
  }

  @Delete(':id')
  deleteTask(@GetUser('id') userId: string, @Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId, userId);
  }

  @Post()
  createTast(@Body() dto: CreatTaskDto, @GetUser('sub') id: never) {
    return this.taskService.createTask(dto, id);
  }
}
