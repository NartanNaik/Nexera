import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('seed')
  createFirstUser() {
    return this.authService.createFirstUser();
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}