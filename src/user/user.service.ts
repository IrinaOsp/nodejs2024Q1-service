import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { database } from 'src/db/database';
import { IUser, User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user: IUser = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    database.users.push(user);
    return user;
  }

  findAll() {
    return database.users;
  }

  findOne(id: string) {
    const user = database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: string, newPassword: string, oldPassword: string) {
    const user = database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Old password ${oldPassword} is wrong`);
    }
    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const user = database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    database.users = database.users.filter((user) => user.id !== id);
    return `User ${id} deleted`;
  }
}
