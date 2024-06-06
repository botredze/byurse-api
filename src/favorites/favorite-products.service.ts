import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoriteProduct } from '../database/models/favorite.model';
import { Product } from '../database/models/product.model';

@Injectable()
export class FavoriteProductsService {
  constructor(
    @InjectModel(FavoriteProduct) private favoriteProductModel: typeof FavoriteProduct,
  ) {}

  async addToFavorites(userId: number, productId: number): Promise<void> {
    await this.favoriteProductModel.create({ userId, productId });
  }

  async removeFromFavorites(userId: number, productId: number): Promise<void> {
    await this.favoriteProductModel.destroy({ where: { userId, productId } });
  }

  async getFavoritesByUserId(userId: number): Promise<Product[]> {
    const favoriteProducts = await this.favoriteProductModel.findAll({ where: { userId } });
    return favoriteProducts.map(fp => fp.product);
  }
}
