import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'New user created', type: User })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all users', type: [User] })
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User successfully updated', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Old password is wrong' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    return this.userService.update(id, newPassword, oldPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: `User successfully deleted` })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
