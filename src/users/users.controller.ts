import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(@Query('role') role?: Role) {
    const users = await this.userService.findAll(role);
    const mapped = users.map((user) => {
      return { ...user, id: user.id.toString() };
    });
    return {
      msg: 'Getting all users successfully👍',
      users: mapped,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return {
      msg: 'Getting user successfully👍',
      user: user ? { ...user, id: user.id.toString() } : null,
    };
  }

  @Post()
  async create(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    const user = await this.userService.create(createUserDto);
    return {
      msg: 'User created successfully👍',
      user: user ? { ...user, id: user.id.toString() } : null,
    };
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: Prisma.UserUpdateInput,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      msg: 'User updated successfully👍',
      user: user ? { ...user, id: user.id.toString() } : null,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return {
      msg: 'User deleted successfully👍',
      user: user ? { ...user, id: user.id.toString() } : null,
    };
  }
}
