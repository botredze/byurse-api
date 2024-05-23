import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'sp_brand' })
export class SpBrand extends Model<SpBrand> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  brandName: string;

  @Column({ type: DataType.STRING })
  collectionName: string;
}
