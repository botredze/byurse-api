import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoriteProductsService } from './favorite-products.service';
import { FavoriteProductsController } from './favorite-products.controller';
import { User } from "../database/models/user.model";
import { Product } from "../database/models/product.model";
import { FavoriteProduct } from "../database/models/favorite.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Product, FavoriteProduct])],
  providers: [FavoriteProductsService],
  controllers: [FavoriteProductsController],
})
export class FavoriteProductsModule {}
