import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";
import { Basket } from "./basket.model";
import { ProductColor } from "./product-color.model";
import { ProductSize } from "./product-size.model";

@Table({ tableName: "basket_items" })
export class BasketItem extends Model<BasketItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  basketId: number;

  @ForeignKey(() => ProductColor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  colorId: number;

  @ForeignKey(() => ProductSize)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sizeId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Basket)
  basket: Basket;

  @BelongsTo(() => ProductColor)
  color: ProductColor;

  @BelongsTo(() => ProductSize)
  size: ProductSize;
}
