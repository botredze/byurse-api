import { Controller, Get } from '@nestjs/common';
import { ReferenceDataService } from "./referenct-data.service";

@Controller('reference-data')
export class ReferenceDataController {
  constructor(private readonly referenceDataService: ReferenceDataService) {}

  @Get('categories')
  findAllCategories() {
    return this.referenceDataService.findAllCategories();
  }

  @Get('colors')
  findAllColors() {
    return this.referenceDataService.findAllColors();
  }

  @Get('brands')
  findAllBrands() {
    return this.referenceDataService.findAllBrands();
  }

  @Get('genders')
  findAllGenders() {
    return this.referenceDataService.findAllGenders();
  }

  @Get('sizes')
  findAllSizes() {
    return this.referenceDataService.findAllSizes();
  }
}
