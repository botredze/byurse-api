import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserDetails } from "./user-details.model";

@Table
export class Address extends Model<Address> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => UserDetails)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userDetailsId: number;

  @ApiProperty({ example: 'USA' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({ example: '12345' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCode: string;

  @ApiProperty({ example: 'Main St' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: 'Apt 123' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apartmentNumber: string;
}
