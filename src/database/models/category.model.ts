import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  categoryName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  gender: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  type_size: number;
}
