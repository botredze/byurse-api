import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ tableName: 'product_details' })
export class ProductDetails extends Model<ProductDetails> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  material: string;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @Column({ type: DataType.STRING, allowNull: false })
  articul: string;
}
