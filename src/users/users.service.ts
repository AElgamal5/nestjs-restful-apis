import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  store(createDto: {
    name: string;
    email: string;
    role: 'GEST' | 'USER' | 'ADMIN';
  }) {
    const newUser = {
      id: this.users[this.users.length - 1].id + 1,
      ...createDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateDto: {
      name?: string;
      email?: string;
      role?: 'GEST' | 'USER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateDto };
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
