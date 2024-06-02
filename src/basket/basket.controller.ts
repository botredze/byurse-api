import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"; // Импорт необходимых декораторов Swagger
import { BasketService } from "./basket.service";
import { AddItemDto } from "./dto/add-item.dto";

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('addItem')
  @ApiOperation({ summary: 'Add item to basket' }) // Описание операции
  @ApiOkResponse({ description: 'Item added to basket successfully' }) // Успешный ответ
  @ApiBadRequestResponse({ description: 'Bad request' }) // Ответ при некорректном запросе
  @ApiInternalServerErrorResponse({ description: 'Internal server error' }) // Ответ при внутренней ошибке сервера
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
