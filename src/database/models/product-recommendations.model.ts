import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from './product.model';

@Table({ tableName: 'product_recommendations' })
export class ProductRecommendation extends Model<ProductRecommendation> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  recommendedProductId: number;

  @BelongsTo(() => Product, { foreignKey: 'productId' })
  product: Product;

  @BelongsTo(() => Product, { foreignKey: 'recommendedProductId', as: 'recommendedProduct' })
  recommendedProduct: Product;
}
