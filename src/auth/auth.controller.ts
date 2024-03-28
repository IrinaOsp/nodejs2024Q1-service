import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() { login, password }: CreateUserDto) {
    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      login,
      password: hashedPassword,
    });
    return `User ${user.login} was created`;
  }

  @Post('login')
  async login(@Body() { login, password }: CreateUserDto) {
    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.authService.login(login, password);
    return jwt;
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return await this.authService.refresh(refreshToken);
  }
}
