import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.model';
import { Basket } from './basket.model';

@Table({ tableName: 'basket_items' })
export class BasketItem extends Model<BasketItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  basketId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Basket)
  basket: Basket;


}
