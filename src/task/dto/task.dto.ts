import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus, TaskCategory, TaskPriority } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  StatusType,
  CategoryType,
  PriorityTpe,
} from '../interfaces/task.interfaces';

export class CreatTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  due_date: Date;

  @IsEnum(TaskStatus, { message: 'Invalid status type' })
  @IsOptional()
  status?: StatusType;

  @IsEnum(TaskCategory, { message: 'Invalid category type' })
  category: CategoryType;

  @IsEnum(TaskPriority, { message: 'Invalid priority type' })
  @IsOptional()
  priority: PriorityTpe;
}

export class UpdateTaskDto extends PartialType(CreatTaskDto) {}

export class QueryListDto {
  @IsEnum(TaskStatus, { message: 'Invalid status type' })
  @IsOptional()
  status: StatusType;

  @IsEnum(TaskCategory, { message: 'Invalid category type' })
  @IsOptional()
  category: CategoryType;

  @IsEnum(TaskPriority, { message: 'Invalid priority type' })
  @IsOptional()
  priority: PriorityTpe;
}
