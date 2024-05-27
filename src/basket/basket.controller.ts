import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { BasketService } from "./basket.service";
import { AddItemDto } from "./dto/add-item.dto";

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('addItem')
  async addItemToBasket(@Body() addItemDto: AddItemDto): Promise<any> {
    try {
      await this.basketService.addItemToBasket(addItemDto.userId, addItemDto.productId);
      return { message: 'Item added to basket successfully' };
    } catch (error) {
      console.error('Error adding item to basket:', error);
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
