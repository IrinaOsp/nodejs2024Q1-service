import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, User } from './entities/user.entity';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity: Omit<IUser, 'createdAt' | 'updatedAt'> = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuidv4(),
      version: 1,
    });
    const user = await this.dbService.user
      .create({ data: userEntity })
      .then((res) => {
        return {
          ...res,
          createdAt: new Date(res.createdAt).getTime(),
          updatedAt: new Date(res.updatedAt).getTime(),
        };
      });
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll() {
    return await this.dbService.user.findMany().then((res) => {
      return res.map((user) => {
        return {
          ...user,
          createdAt: new Date(user.createdAt).getTime(),
          updatedAt: new Date(user.updatedAt).getTime(),
        };
      });
    });
  }

  async findOne(id: string) {
    try {
      const user = await this.dbService.user
        .findUnique({ where: { id } })
        .then((res) => {
          return {
            ...res,
            createdAt: new Date(res.createdAt).getTime(),
            updatedAt: new Date(res.updatedAt).getTime(),
          };
        });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async update(id: string, newPassword: string, oldPassword: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Old password ${oldPassword} is wrong`);
    }
    user.password = newPassword;
    user.version++;
    user.updatedAt = new Date(Date.now());
    const updatedUser = await this.dbService.user.update({
      where: { id },
      data: user,
    });

    return {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: new Date(updatedUser.createdAt).getTime(),
      updatedAt: new Date(updatedUser.updatedAt).getTime(),
    };
  }

  async remove(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.dbService.user.delete({ where: { id } });
    return `User ${id} deleted`;
  }

  async findUserByLogin(login: string) {
    return await this.dbService.user.findFirst({ where: { login } });
  }
}
