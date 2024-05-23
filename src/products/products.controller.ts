import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../database/models/product.model';
import { ErrorResponseDto } from './dto/error-response.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found', type: ErrorResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      }, HttpStatus.NOT_FOUND);
    }
    return product;
  }


  @ApiOperation({ summary: 'Get products by filter' })
  @ApiResponse({ status: 200, description: 'List of products matching the filter', type: [Product] })
  @Get('filter')
  async findByFilter(
    @Query('genderId') genderId: number,
    @Query('categoryId') categoryId: number,
    @Query('sizeId') sizeId: number,
    @Query('colorId') colorId: number,
    @Query('priceMin') priceMin: number,
    @Query('priceMax') priceMax: number,
    @Query('collectionName') collectionName: string,
  ) {
    return this.productsService.findByFilter({
      genderId,
      categoryId,
      sizeId,
      colorId,
      priceMin,
      priceMax,
      collectionName,
    });
  }
}
