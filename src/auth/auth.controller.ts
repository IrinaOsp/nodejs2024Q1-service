import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
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
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.CRYPT_SALT),
    );
    const user = await this.userService.create({
      login,
      password: hashedPassword,
    });
    return user;
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
    return await this.authService.login(login, password);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }
    try {
      return await this.authService.refresh(refreshToken);
    } catch (error) {
      throw new ForbiddenException(
        'Invalid refresh token or expired',
        error?.message,
      );
    }
  }
}
