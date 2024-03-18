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
    // const currentTimeStamp = Date.now();
    const userEntity: Omit<IUser, 'createdAt' | 'updatedAt'> = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuidv4(),
      version: 1,
      // createdAt: currentTimeStamp,
      // updatedAt: currentTimeStamp,
    });
    const user: IUser = await this.dbService.user
      .create({ data: userEntity })
      .then((res) => {
        return {
          ...res,
          createdAt: new Date(res.createdAt).getTime(),
          updatedAt: new Date(res.updatedAt).getTime(),
        };
      });
    return user;
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
    const user = await this.dbService.user
      .findUnique({ where: { id } })
      .then((res) => {
        return {
          ...res,
          createdAt: new Date(res.createdAt).getTime(),
          updatedAt: new Date(res.updatedAt).getTime(),
        };
      });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
    const updatedUser = await this.dbService.user
      .update({
        where: { id },
        data: user,
      })
      .then((res) => {
        return {
          ...res,
          createdAt: new Date(res.createdAt).getTime(),
          updatedAt: new Date(res.updatedAt).getTime(),
        };
      });
    // user.version++;
    // user.updatedAt = Date.now();
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.dbService.user.delete({ where: { id } });
    return `User ${id} deleted`;
  }
}
