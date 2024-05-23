import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from "./models/product.model";
import { SpGender } from "./models/sp-gender.model";
import { SpBrand } from "./models/sp-brand.model";
import { Category } from "./models/category.model";
import { Rating } from "./models/rating.model";
import { ProductDetails } from "./models/product-details.model";
import { SpColorPalitry } from "./models/sp-color-palitry.model";
import { SpSizeRate } from "./models/sp-size-rate.model";
import { Address } from "./models/address.model";
import { UserDetails } from "./models/user-details.model";
import { User } from "./models/user.model";
import { Basket } from "./models/basket.model";
import { BasketItem } from "./models/basket-item.model";
import { ViewUserHistory } from "./models/view-user-history.model";
import { ProductRecommendation } from "./models/product-recommendations.model";
import { ProductSize } from "./models/product-size.model";
import { ProductColor } from "./models/product-color.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync(path.resolve(__dirname, '..', '..', 'ca-certificate.crt')).toString(),
        },
      },
      autoLoadModels: true,
      synchronize: true,
      models: [Product, SpGender, SpBrand, Category, Rating, ProductDetails, SpColorPalitry, SpSizeRate, Address, UserDetails, User, Basket, BasketItem, ViewUserHistory, ProductRecommendation, ProductDetails, ProductSize, ProductColor],
    }),
  ],
})
export class DatabaseModule {}
