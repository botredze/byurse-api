import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Basket } from "../database/models/basket.model";
import { BasketItem } from "../database/models/basket-item.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BasketService {

  constructor(@InjectModel(Basket) private basketModel: typeof Basket,
              @InjectModel(BasketItem) private basketItemModel: typeof BasketItem) {
  }

  async addItemToBasket(userId: number, productId: number, colorId: number, sizeId: number): Promise<void> {
    try {
      let basket = await this.basketModel.findOne({ where: { userId } });

      if (!basket) {
        basket = await this.basketModel.create({ userId });
      }

      await this.basketItemModel.create({ basketId: basket.id, productId, colorId, sizeId });
    } catch (error) {
      console.error('Error adding item to basket:', error);
      throw new InternalServerErrorException('Error adding item to basket');
    }
  }

  async getUserBasket(userId: number): Promise<Basket | null> {
    const basket = await this.basketModel.findOne({ where: { userId }, include: [BasketItem] });
    return basket || null;
  }

  async removeItemFromBasket(userId: number, itemId: number): Promise<void> {
    try {
      const basket = await this.basketModel.findOne({ where: { userId } });

      if (!basket) {
        throw new NotFoundException('Basket not found');
      }

      const basketItem = await this.basketItemModel.findOne({ where: { id: itemId, basketId: basket.id } });

      if (!basketItem) {
        throw new NotFoundException('Basket item not found');
      }

      await basketItem.destroy();
    } catch (error) {
      console.error('Error removing item from basket:', error);
      throw new InternalServerErrorException('Error removing item from basket');
    }
  }
}
