import { Model, Column, DataType, Table, ForeignKey, HasMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "./user.model";
import { Address } from "./address.model";

@Table
export class UserDetails extends Model<UserDetails> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @ApiProperty({ example: 'John' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'Patronimic' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patronymic: string;

  @ApiProperty({ type: [Address] })
  @HasMany(() => Address)
  addresses: Address[];
}
