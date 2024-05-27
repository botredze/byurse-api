import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { SpGender } from './sp-gender.model';
import { SpBrand } from './sp-brand.model';
import { Category } from './category.model';
import { Rating } from './rating.model';
import { ProductDetails } from './product-details.model';
import { SpColorPalitry } from './sp-color-palitry.model';
import { SpSizeRate } from './sp-size-rate.model';
import { BasketItem } from './basket-item.model';
import { ViewUserHistory } from './view-user-history.model';
import { ProductColor } from './product-color.model';
import { ProductSize } from './product-size.model';
import { ProductRecommendation } from './product-recommendations.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  productName: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.FLOAT })
  oldPrice: number;

  @Column({ type: DataType.FLOAT })
  discount: number;

  @Column({ type: DataType.BOOLEAN })
  discountActive: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  position: number;

  @ForeignKey(() => SpGender)
  @Column({ type: DataType.INTEGER, allowNull: false })
  genderId: number;

  @ForeignKey(() => SpBrand)
  @Column({ type: DataType.INTEGER, allowNull: false })
  brandId: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @BelongsTo(() => SpGender)
  gender: SpGender;

  @BelongsTo(() => SpBrand)
  brand: SpBrand;

  @BelongsTo(() => Category)
  category: Category;

  @HasOne(() => Rating)
  rating: Rating;

  @HasOne(() => ProductDetails)
  productDetails: ProductDetails;

  @HasMany(() => BasketItem)
  basketItems: BasketItem[];

  @HasMany(() => ViewUserHistory)
  viewHistories: ViewUserHistory[];

  @HasMany(() => ProductColor)
  colors: ProductColor[];

  @HasMany(() => ProductSize)
  sizes: ProductSize[];

  @HasMany(() => ProductRecommendation)
  recommendations: ProductRecommendation[];
}
