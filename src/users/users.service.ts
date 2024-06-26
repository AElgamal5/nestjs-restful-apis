import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(role?: Role) {
    if (role) {
      return this.databaseService.user.findMany({
        where: { role: role },
      });
    }
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: BigInt(id) },
    });
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id: BigInt(id) },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({ where: { id: BigInt(id) } });
  }
}
