import { Body, Controller, HttpStatus, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BasketService } from "./basket.service";
import { AddItemDto } from "./dto/add-item.dto";

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}


  @Get(':userId')
  @ApiOperation({ summary: 'Get user basket' })
  @ApiOkResponse({ description: 'Basket retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Basket not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserBasket(@Param('userId') userId: number): Promise<any> {
    try {
      const basket = await this.basketService.getUserBasket(userId);
      return basket || null;
    } catch (error) {
      console.error('Error getting user basket:', error);
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Post('addItem')
  @ApiOperation({ summary: 'Add item to basket' })
  @ApiOkResponse({ description: 'Item added to basket successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
