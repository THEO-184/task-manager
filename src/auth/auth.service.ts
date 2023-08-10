import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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

    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      username: user.username,
      email: user.email,
      id: user.id,
    };
  }
}
