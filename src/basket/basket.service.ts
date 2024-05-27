import { Injectable } from '@nestjs/common';
import { Basket } from "../database/models/basket.model";
import { BasketItem } from "../database/models/basket-item.model";

@Injectable()
export class BasketService {
  async addItemToBasket(userId: number, productId: number): Promise<void> {
    try {
      let basket = await Basket.findOne({ where: { userId } });

      if (!basket) {
        basket = await Basket.create({ userId });
      }

      await BasketItem.create({ basketId: basket.id, productId });
    } catch (error) {
      console.error('Error adding item to basket:', error);
      throw error;
    }
  }
}
