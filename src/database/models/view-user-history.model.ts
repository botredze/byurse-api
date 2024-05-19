import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './user.model';

@Table({ tableName: 'view_user_history' })
export class ViewUserHistory extends Model<ViewUserHistory> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  watchDate: Date;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;
}
