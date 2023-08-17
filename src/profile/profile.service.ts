import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    delete user.password;
    return user;
  }

  async updateProfile(dto: UpdateProfileDto, id: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
        username: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });
    return { count: users.length, data: users };
  }
}
