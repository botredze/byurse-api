import { Injectable, NotFoundException } from '@nestjs/common';
import { Basket } from "../database/models/basket.model";
import { BasketItem } from "../database/models/basket-item.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BasketService {

  constructor(@InjectModel(Basket) private  basketModel: typeof Basket){
  }
  async addItemToBasket(userId: number, productId: number): Promise<void> {
    try {
      let basket = await this.basketModel.findOne({ where: { userId } });

      if (!basket) {
        basket = await this.basketModel.create({ userId });
      }

      await BasketItem.create({ basketId: basket.id, productId });
    } catch (error) {
      console.error('Error adding item to basket:', error);
      throw error;
    }
  }

  async getUserBasket(userId: number): Promise<Basket | null> {
    const basket = await Basket.findOne({ where: { userId }, include: [BasketItem] });
    return basket || null;
  }
}
