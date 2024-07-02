import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Product } from './product.model';
import { SpSizeRate } from './sp-size-rate.model';
import { BasketItem } from "./basket-item.model";
import { FavoriteProduct } from "./favorite.model";

@Table({ tableName: 'product_sizes' })
export class ProductSize extends Model<ProductSize> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => SpSizeRate)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sizeId: number;

  @BelongsTo(() => SpSizeRate)
  size: SpSizeRate;

  @HasMany(() => BasketItem)
  basketItems: BasketItem[];

  @HasMany(() => FavoriteProduct)
  favorite: FavoriteProduct[];
}
