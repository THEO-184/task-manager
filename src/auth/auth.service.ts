import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async SignUp(dto: SignUpDto) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(dto.password, salt);
    await this.prisma.user.create({
      data: { ...dto, password },
    });
    return { message: 'Created Successfully' };
  }

  async Login(dto: LoginDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: dto.email,
      },
    });

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      return {
        message: 'Invalid Credenitials',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    return user;
  }
}
