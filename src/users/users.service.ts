import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Amir Said',
      email: 'amir@test.com',
      role: 'GEST',
    },
    {
      id: 2,
      name: 'Ahmed Samir',
      email: 'samir@test.com',
      role: 'GEST',
    },
    {
      id: 3,
      name: 'Ahmed Elgamal',
      email: 'gamal@test.com',
      role: 'USER',
    },
    {
      id: 4,
      name: 'Ahmed Walid',
      email: 'walid@test.com',
      role: 'USER',
    },
    {
      id: 5,
      name: 'Admin Admin',
      email: 'admin@test.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'GEST' | 'USER' | 'ADMIN') {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
      if (!users.length) {
        throw new NotFoundException('No users with this role: ' + role);
      }
      return users;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('No user with this id: ' + id);
    return user;
  }

  store(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users[this.users.length - 1].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
