import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return 'I am signed in';
  }

  @Post('signup')
  SignUp(@Body() dto: SignUpDto) {
    console.log({ dto });
    return 'I am logged in';
  }
}
