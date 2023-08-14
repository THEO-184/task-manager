import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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
