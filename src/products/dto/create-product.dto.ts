import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  readonly productName: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly oldPrice?: number;

  @ApiProperty()
  readonly discount?: number;

  @ApiProperty()
  readonly discountActive?: boolean;

  @ApiProperty()
  readonly position: number;

  @ApiProperty()
  readonly genderId: number;

  @ApiProperty()
  readonly brandId: number;

  @ApiProperty()
  readonly categoryId: number;

  @ApiProperty({ type: [Number] })
  readonly colors: number[];

  @ApiProperty({ type: [Number] })
  readonly sizes: number[];
}
