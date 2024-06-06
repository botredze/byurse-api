import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.model';
import { SpColorPalitry } from './sp-color-palitry.model';

@Table({ tableName: 'product_colors' })
export class ProductColor extends Model<ProductColor> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => SpColorPalitry)
  @Column({ type: DataType.INTEGER, allowNull: false })
  colorId: number;

  @BelongsTo(() => SpColorPalitry)
  color: SpColorPalitry;
}
