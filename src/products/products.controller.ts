import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth('access-token')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  @UseGuards(JwtGuard)
  create(
    @GetUser('id') userId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(userId, createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  @UseGuards(JwtGuard)
  findAllByUserId(@GetUser('id') userId: number) {
    return this.productsService.findAllByUserId(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  @UseGuards(JwtGuard)
  findOne(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productsService.findOne(userId, productId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  @UseGuards(JwtGuard)
  update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(userId, productId, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse()
  @UseGuards(JwtGuard)
  remove(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productsService.remove(userId, productId);
  }
}
