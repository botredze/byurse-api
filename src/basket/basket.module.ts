import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { BasketItem } from "../database/models/basket-item.model";
import { Basket } from "../database/models/basket.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Basket, BasketItem]),
  ],

  providers: [BasketService],
  controllers: [BasketController]
})
export class BasketModule {}
