import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'sp_gender' })
export class SpGender extends Model<SpGender> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  genderName: string;
}
