import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const user = await this.userService.findUserByLogin(login);
    if (!user) {
      throw new ForbiddenException(`User ${login} not found`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException(`Password ${password} is wrong`);
    }
    const accessToken = await this.jwtService.signAsync(
      { id: user.id, login: user.login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, login: user.login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    try {
      const payload = await this.validateRefreshToken(token);
      return {
        accessToken: this.jwtService.sign(
          { userId: payload.id, login: payload.login },
          {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
          },
        ),
        refreshToken: this.jwtService.sign(
          { userId: payload.id, login: payload.login },
          {
            secret: process.env.JWT_SECRET_REFRESH_KEY,
            expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
          },
        ),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  // const user = await this.userService.findOne(payload.id);
  // что приходит в payload??

  async validateRefreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return payload;
    } catch (error) {
      throw new ForbiddenException(`Token is invalid`);
    }
  }
}
