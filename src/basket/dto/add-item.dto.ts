import { ApiProperty } from '@nestjs/swagger';

export class AddItemDto {
  @ApiProperty({
    description: 'The ID of the user adding the item to the basket',
    example: 1,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'The ID of the product being added to the basket',
    example: 123,
  })
  readonly productId: number;

  @ApiProperty({
    description: 'The ID of the color variant of the product',
    example: 45,
  })
  readonly colorId?: number;

  @ApiProperty({
    description: 'The ID of the size variant of the product',
    example: 67,
  })
  readonly sizeId?: number;
}
