import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  readonly country: string;

  @IsString()
  readonly postalCode: string;

  @IsString()
  readonly street: string;

  @IsString()
  readonly apartmentNumber: string;
}
