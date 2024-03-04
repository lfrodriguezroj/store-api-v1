import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await argon.hash(createUserDto.password);
    delete createUserDto.password;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (user) throw new ForbiddenException('User already exists.');

      const res = await this.prisma.user.create({
        data: {
          password: hash,
          ...createUserDto,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists.');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user)
      throw new NotFoundException(`User with id = ${id} does not exist.`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(`User with id = ${id} does not exist.`);

    const res = await this.prisma.user.update({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      data: updateUserDto,
    });

    return res;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user)
      throw new NotFoundException(`User with id = ${id} does not exist.`);

    return await this.prisma.user.delete({ where: { id } });
  }
}
