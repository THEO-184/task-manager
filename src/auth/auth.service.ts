import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async SignUp(dto: SignUpDto) {
    const user = await this.prisma.user.create({
      data: { ...dto },
    });

    return { msg: 'Created Successfully', user };
  }
}
