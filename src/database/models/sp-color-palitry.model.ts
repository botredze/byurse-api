import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ tableName: 'sp_color_palitry' })
export class SpColorPalitry extends Model<SpColorPalitry> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  color: string;
}
