import { Model, Column, DataType, Table, HasOne, HasMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { UserDetails } from "./user-details.model";
import { Basket } from "./basket.model";
import { ViewUserHistory } from "./view-user-history.model";

@Table
export class User extends Model<User> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1234' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @ApiProperty({ example: '+1234567890' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @ApiProperty({ type: UserDetails })
  @HasOne(() => UserDetails)
  userDetails: UserDetails;


  @HasMany(() => Basket)
  baskets: Basket[];

  @HasMany(() => ViewUserHistory)
  viewHistory: ViewUserHistory[];
}
