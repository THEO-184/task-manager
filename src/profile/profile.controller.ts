import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/guard.guard';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { GetUser } from './decorators/getUser.decorator';
import { TokenPayload } from 'src/auth/interfaces/tokenPayload.interface';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get()
  getProfile(@GetUser() user: TokenPayload) {
    const id = user.sub;
    return this.profileService.getProfile(id);
  }
}
