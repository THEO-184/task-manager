import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('test')
  test() {
    return 'test';
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.Login(dto);
  }

  @Post('signup')
  SignUp(@Body() dto: SignUpDto) {
    return this.authService.SignUp(dto);
  }
}
