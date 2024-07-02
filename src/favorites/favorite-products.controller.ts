import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { FavoriteProductsService } from './favorite-products.service';
import { Product } from "../database/models/product.model";
import { ApiTags, ApiParam, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AddItemDto } from "../basket/dto/add-item.dto";

@ApiTags('Favorites')
@Controller('users/:userId/favorites')
export class FavoriteProductsController {
  constructor(private favoriteProductsService: FavoriteProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product to favorites' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: AddItemDto })
  async addToFavorites(@Param('userId') userId: number, @Body() addItemDto: AddItemDto): Promise<void> {
    await this.favoriteProductsService.addToFavorites(userId, addItemDto.productId, addItemDto.colorId, addItemDto.sizeId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove a product from favorites' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  async removeFromFavorites(@Param('userId') userId: number, @Param('productId') productId: number): Promise<void> {
    await this.favoriteProductsService.removeFromFavorites(userId, productId);
  }

  @Get()
  @ApiOperation({ summary: 'Get favorite products by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Favorite products retrieved successfully', type: Product, isArray: true })
  async getFavoritesByUserId(@Param('userId') userId: number): Promise<Product[]> {
    return this.favoriteProductsService.getFavoritesByUserId(userId);
  }
}
