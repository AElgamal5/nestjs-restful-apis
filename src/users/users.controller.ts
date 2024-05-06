import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(@Query('role') role?: 'GEST' | 'USER' | 'ADMIN') {
    return {
      msg: 'get all users',
      users: this.userService.findAll(role),
    };
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return {
      msg: 'get user by id: ' + id,
      user: this.userService.findOne(id),
    };
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return {
      msg: 'User created successfully👍',
      user: this.userService.store(createUserDto),
    };
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return {
      msg: 'User updated successfully👍',
      user: this.userService.update(id, updateUserDto),
    };
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      msg: 'User deleted successfully👍',
      user: this.userService.delete(id),
    };
  }
}
