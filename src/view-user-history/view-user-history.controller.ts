import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ViewUserHistoryService } from './view-user-history.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody } from '@nestjs/swagger';

@Controller('view-history')
@ApiTags('View History')
export class ViewUserHistoryController {
  constructor(private readonly viewUserHistoryService: ViewUserHistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create view history' })
  @ApiBody({ schema: { example: { userId: 123, productId: 456 } } })
  @ApiResponse({ status: 200, description: 'View history created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiInternalServerErrorResponse({ description: 'Failed to create view history' })
  async create(@Body('userId') userId: number, @Body('productId') productId: number) {
    try {
      return await this.viewUserHistoryService.createViewHistory(userId, productId);
    } catch (error) {
      throw new HttpException('Failed to create view history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find user view history' })
  @ApiParam({ name: 'userId', description: 'User ID', example: 123 })
  @ApiResponse({ status: 200, description: 'User view history found successfully' })
  @ApiResponse({ status: 404, description: 'User view history not found' })
  async findUserViewHistory(@Param('userId') userId: number) {
    return this.viewUserHistoryService.findUserViewHistory(userId);
  }
}
