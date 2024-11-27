import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@/auth/dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '@/auth/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    return !!user;
  }

  async register(registerDto: RegisterDto) {
    try {
      const emailExists = await this.emailExists(registerDto.email);
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.userService.create({
        ...registerDto,
        password: hashedPassword,
      });

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      return { access_token, user };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
