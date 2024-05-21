import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';
import { SpSizeRate } from './sp-size-rate.model';

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
}
