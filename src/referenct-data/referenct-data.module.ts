import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '../database/models/category.model';
import { SpColorPalitry } from '../database/models/sp-color-palitry.model';
import { SpBrand } from '../database/models/sp-brand.model';
import { SpGender } from '../database/models/sp-gender.model';
import { SpSizeRate } from '../database/models/sp-size-rate.model';
import { ReferenceDataController } from "./referenct-data.controller";
import { ReferenceDataService } from "./referenct-data.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Category, SpColorPalitry, SpBrand, SpGender, SpSizeRate]),
  ],
  controllers: [ReferenceDataController],
  providers: [ReferenceDataService],
})
export class ReferenceDataModule {}
