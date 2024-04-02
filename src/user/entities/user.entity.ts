import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements Partial<IUser> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt?: number;

  @ApiProperty()
  updatedAt?: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
