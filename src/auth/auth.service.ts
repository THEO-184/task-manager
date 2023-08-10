import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/auth.dto';
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
    return { msg: 'Created Successfully' };
  }
}
