import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Product } from './product.model';
import { User } from './user.model';

@Table({ tableName: 'favorite_products' })
export class FavoriteProduct extends Model<FavoriteProduct> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
