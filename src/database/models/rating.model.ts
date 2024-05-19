import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ tableName: 'ratings' })
export class Rating extends Model<Rating> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  rate: number;
}
