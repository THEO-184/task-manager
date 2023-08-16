import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { TaskStatus, TaskCategory, TaskPriority } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
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

  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsOptional()
  collaborators?: string[];
}

export class UpdateTaskDto extends PartialType(
  OmitType(CreatTaskDto, ['collaborators']),
) {}

export class AddCollaboratorDto extends PickType(CreatTaskDto, [
  'collaborators',
]) {}

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
