import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { STRING } from "sequelize";

class CreateProductDetailsDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  material: string;

  @ApiProperty()
  country: string;
}

export class CreateProductDto {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  discountActive: boolean;

  @ApiProperty()
  position: number;

  @ApiProperty()
  genderId: number;

  @ApiProperty()
  brandId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ type: [Number], description: 'Array of color IDs' })
  colors?: number[];

  @ApiProperty({ type: [Number], description: 'Array of size IDs' })
  sizes?: number[];

  @ApiProperty({ type: [Number], description: 'Array of recommended product IDs' })
  recommendations?: number[];

  @ApiProperty({ type: CreateProductDetailsDto, description: 'Product details' })
  details: CreateProductDetailsDto;

  @ApiProperty({ type: [String], example: ['photo1.jpg', 'photo2.jpg'] })
  photos?: string[];
}
