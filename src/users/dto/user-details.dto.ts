import { IsString, IsEmail } from 'class-validator';

export class UserDetailsDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly patronymic: string;
}
