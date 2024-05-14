import { Model, Column, DataType, Table, HasOne } from 'sequelize-typescript';
import { UserDetails } from './user-details.model';
import { ApiProperty } from '@nestjs/swagger';

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
}
