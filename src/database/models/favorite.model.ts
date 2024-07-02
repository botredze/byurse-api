import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Product } from './product.model';
import { User } from './user.model';
import { ProductColor } from "./product-color.model";
import { ProductSize } from "./product-size.model";

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

  @ForeignKey(() => ProductColor)
  @Column({ type: DataType.INTEGER, allowNull: true })
  colorId?: number;

  @ForeignKey(() => ProductSize)
  @Column({ type: DataType.INTEGER, allowNull: true })
  sizeId?: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => ProductColor)
  color: ProductColor;

  @BelongsTo(() => ProductSize)
  size: ProductSize;
}
