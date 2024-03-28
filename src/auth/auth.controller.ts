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
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
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
  @HttpCode(200)
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Login and/or password are invalid' })
  @ApiForbiddenResponse({ description: 'Authentication failed' })
  async login(@Body() { login, password }: CreateUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const tokens = await this.authService.login(login, password);
    return tokens;
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Refresh successful' })
  @ApiForbiddenResponse({ description: 'Invalid or expired refresh token' })
  @ApiUnauthorizedResponse({ description: 'No refresh token' })
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    if (!refreshToken || typeof refreshToken !== 'string') {
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
