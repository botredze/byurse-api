import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../database/models/product.model';
import { FavoriteProduct } from "../database/models/favorite.model";

@Injectable()
export class FavoriteProductsService {
  constructor(
    @InjectModel(FavoriteProduct) private favoriteProductModel: typeof FavoriteProduct,
  ) {}

  async addToFavorites(userId: number, productId: number, colorId: number, sizeId: number): Promise<void> {
    await this.favoriteProductModel.create({ userId, productId, colorId, sizeId });
  }

  async removeFromFavorites(userId: number, productId: number): Promise<void> {
    await this.favoriteProductModel.destroy({ where: { userId, productId } });
  }

  async getFavoritesByUserId(userId: number): Promise<Product[]> {
    const favoriteProducts = await this.favoriteProductModel.findAll({ where: { userId }, include: [Product] });
    return favoriteProducts.map(fp => fp.product);
  }
}
