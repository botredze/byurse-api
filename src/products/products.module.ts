import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from "../database/models/product.model";
import { Category } from "../database/models/category.model";
import { ProductColor } from "../database/models/product-color.model";
import { ProductSize } from "../database/models/product-size.model";
import { ProductRecommendation } from "../database/models/product-recommendations.model";
import { ProductDetails } from "../database/models/product-details.model";


@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      Product,
      ProductColor,
      ProductSize,
      ProductRecommendation,
      ProductDetails,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
