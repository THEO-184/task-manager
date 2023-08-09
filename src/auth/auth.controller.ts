import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return 'I am signed in';
  }

  @Post('signup')
  SignUp(@Body() dto: SignUpDto) {
    return this.authService.SignUp(dto);
  }
}
