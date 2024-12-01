import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ExcludePasswordInterceptor } from '../interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ExcludePasswordInterceptor)
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return this.authService.register(registerDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
