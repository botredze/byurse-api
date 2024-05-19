import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ tableName: 'sp_size_rate' })
export class SpSizeRate extends Model<SpSizeRate> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  sizeName: string;
}
