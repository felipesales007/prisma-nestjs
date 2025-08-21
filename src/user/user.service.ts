import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.servce';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  findOneByEmail(username: string) {
    return this.prisma.user.findUnique({ where: { email: username } });
  }

  async update(id: number, user: Prisma.UserCreateInput) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        description: user.description,
        photo: user.photo,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }
}
