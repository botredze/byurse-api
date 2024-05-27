import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ViewUserHistoryService } from './view-user-history.service';

@Controller('view-history')
export class ViewUserHistoryController {
  constructor(private readonly viewUserHistoryService: ViewUserHistoryService) {}

  @Post()
  async create(@Body('userId') userId: number, @Body('productId') productId: number) {
    try {
      return await this.viewUserHistoryService.createViewHistory(userId, productId);
    } catch (error) {
      throw new HttpException('Failed to create view history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId')
  async findUserViewHistory(@Param('userId') userId: number) {
    return this.viewUserHistoryService.findUserViewHistory(userId);
  }
}
