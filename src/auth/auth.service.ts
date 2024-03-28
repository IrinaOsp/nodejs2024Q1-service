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
    const jwt = await this.jwtService.signAsync({ id: user.id });
    return jwt;
  }

  async refresh(jwt: string) {
    return ``;
  }
}
