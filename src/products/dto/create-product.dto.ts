import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  material: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  oldPrice: number;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsBoolean()
  discountActive: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  position: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  genderId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ type: [Number], description: 'Array of color IDs' })
  @IsArray()
  @IsOptional()
  colors?: number[];

  @ApiProperty({ type: [Number], description: 'Array of size IDs' })
  @IsArray()
  @IsOptional()
  sizes?: number[];

  @ApiProperty({ type: [Number], description: 'Array of recommended product IDs' })
  @IsArray()
  @IsOptional()
  recommendations?: number[];

  @ApiProperty({ type: CreateProductDetailsDto, description: 'Product details' })
  @ValidateNested()
  @Type(() => CreateProductDetailsDto)
  @IsNotEmpty()
  details: CreateProductDetailsDto;
}
