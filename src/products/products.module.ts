import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from "../database/models/product.model";
import { Category } from "../database/models/category.model";
import { SpColorPalitry } from "../database/models/sp-color-palitry.model";
import { SpBrand } from "../database/models/sp-brand.model";
import { SpGender } from "../database/models/sp-gender.model";
import { SpSizeRate } from "../database/models/sp-size-rate.model";
import { ProductColor } from "../database/models/product-color.model";
import { ProductSize } from "../database/models/product-size.model";
import { ProductRecommendations } from "../database/models/product-recommendations.model";


@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      SpColorPalitry,
      SpBrand,
      SpGender,
      SpSizeRate,
      ProductColor,
      ProductSize,
      ProductRecommendations,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
