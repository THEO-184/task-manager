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
import {
  AddCollaboratorDto,
  CreatTaskDto,
  QueryListDto,
  UpdateTaskDto,
} from './dto/task.dto';
import { TaskService } from './task.service';
import { GetUser } from 'src/profile/decorators/getUser.decorator';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('me')
  getMyTask(@GetUser('sub') userId: string, @Query() query: QueryListDto) {
    return this.taskService.getMyTasks(userId, query);
  }

  @Put(':id')
  updateTask(
    @GetUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    console.log('triggered');

    return this.taskService.updateTask(dto, taskId, userId);
  }

  @Put(':id/assign_collaborator')
  assignCollaborator(
    @GetUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body() dto: AddCollaboratorDto,
  ) {
    console.log('triggered assign');
    return this.taskService.assignCollaborator(taskId, userId, dto);
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
