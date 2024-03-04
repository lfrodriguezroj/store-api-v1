import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        userId,
        ...createProductDto,
      },
    });

    return product;
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.product.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return product;
  }

  async update(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(userId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
