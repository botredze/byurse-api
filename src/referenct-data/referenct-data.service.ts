import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../database/models/category.model';
import { SpColorPalitry } from '../database/models/sp-color-palitry.model';
import { SpBrand } from '../database/models/sp-brand.model';
import { SpGender } from '../database/models/sp-gender.model';
import { SpSizeRate } from '../database/models/sp-size-rate.model';

@Injectable()
export class ReferenceDataService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(SpColorPalitry) private readonly colorModel: typeof SpColorPalitry,
    @InjectModel(SpBrand) private readonly brandModel: typeof SpBrand,
    @InjectModel(SpGender) private readonly genderModel: typeof SpGender,
    @InjectModel(SpSizeRate) private readonly sizeModel: typeof SpSizeRate,
  ) {}

  findAllCategories() {
    return this.categoryModel.findAll();
  }

  findAllColors() {
    return this.colorModel.findAll();
  }

  findAllBrands() {
    return this.brandModel.findAll();
  }

  findAllGenders() {
    return this.genderModel.findAll();
  }

  findAllSizes() {
    return this.sizeModel.findAll();
  }
}
