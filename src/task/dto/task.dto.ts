import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum TaskStatus {
  incomplete,
  progress,
  complete,
}

enum TaskCategory {
  work,
  personal,
  shopping,
}

enum TaskPriority {
  high,
  medium,
  low,
}

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

export type StatusType = 'complete' | 'incomplete' | 'progress';
export type CategoryType = 'work' | 'personal' | 'shopping';
export type PriorityTpe = 'low' | 'medium' | 'high';
export type QueryKeys = 'status' | 'category' | 'priority';
export interface IQueryList {
  status: StatusType;
  category: CategoryType;
  priority: PriorityTpe;
}
