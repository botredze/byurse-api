import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { BasketItem } from './basket-item.model';

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => BasketItem)
  items: BasketItem[];
}
