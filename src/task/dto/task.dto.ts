import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { type } from 'os';

enum TaskStatus {
  complete,
  incomplete,
}

enum TaskCategory {
  work,
  personal,
  shopping,
}

export class CreatTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus, { message: 'Invalid status type' })
  @IsOptional()
  status?: 'complete' | 'incomplete';

  @IsEnum(TaskCategory, { message: 'Invalid category type' })
  category: 'work' | 'personal' | 'shopping';
}

export class UpdateTaskDto extends PartialType(CreatTaskDto) {}

export class QueryListDto {
  @IsEnum(TaskStatus, { message: 'Invalid status type' })
  @IsOptional()
  status: StatusType;

  @IsEnum(TaskCategory, { message: 'Invalid category type' })
  @IsOptional()
  category: CategoryType;
}

export type StatusType = 'complete' | 'incomplete';
export type CategoryType = 'work' | 'personal' | 'shopping';
export type QueryKeys = 'status' | 'category';
export interface IQueryList {
  status: StatusType;
  category: CategoryType;
}
