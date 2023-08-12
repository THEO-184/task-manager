import { OmitType, PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from 'src/auth/dto/auth.dto';

export class UpdateProfileDto extends PartialType(
  OmitType(SignUpDto, ['password'] as const),
) {}
