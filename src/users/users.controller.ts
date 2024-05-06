import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
  getById(@Param('id') id: string) {
    return {
      msg: 'get user by id: ' + id,
      user: this.userService.findOne(+id),
    };
  }

  @Post()
  create(
    @Body()
    createDto: {
      name: string;
      email: string;
      role: 'GEST' | 'USER' | 'ADMIN';
    },
  ) {
    return {
      msg: 'User created successfully👍',
      user: this.userService.store(createDto),
    };
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateDto: {
      name?: string;
      email?: string;
      role?: 'GEST' | 'USER' | 'ADMIN';
    },
  ) {
    return {
      msg: 'User updated successfully👍',
      user: this.userService.update(+id, updateDto),
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return {
      msg: 'User deleted successfully👍',
      user: this.userService.delete(+id),
    };
  }
}
