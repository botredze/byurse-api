import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../database/models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../database/models/category.model';
import { SpColorPalitry } from '../database/models/sp-color-palitry.model';
import { SpBrand } from '../database/models/sp-brand.model';
import { SpGender } from '../database/models/sp-gender.model';
import { SpSizeRate } from '../database/models/sp-size-rate.model';
import { ProductColor } from '../database/models/product-color.model';
import { ProductSize } from '../database/models/product-size.model';
import { ProductRecommendations } from '../database/models/product-recommendations.model';
import { Op } from "sequelize";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(SpColorPalitry) private readonly colorModel: typeof SpColorPalitry,
    @InjectModel(SpBrand) private readonly brandModel: typeof SpBrand,
    @InjectModel(SpGender) private readonly genderModel: typeof SpGender,
    @InjectModel(SpSizeRate) private readonly sizeModel: typeof SpSizeRate,
    @InjectModel(ProductColor) private readonly productColorModel: typeof ProductColor,
    @InjectModel(ProductSize) private readonly productSizeModel: typeof ProductSize,
    @InjectModel(ProductRecommendations) private readonly productRecommendationsModel: typeof ProductRecommendations,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { productName, price, oldPrice, discount, discountActive, position, genderId, brandId, categoryId, colors, sizes } = createProductDto;

    const category = await this.categoryModel.findByPk(categoryId);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }

    const gender = await this.genderModel.findByPk(genderId);
    if (!gender) {
      throw new HttpException('Gender not found', HttpStatus.BAD_REQUEST);
    }

    const brand = await this.brandModel.findByPk(brandId);
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.BAD_REQUEST);
    }

    // Create the product
    const product = await this.productModel.create({
      productName,
      price,
      oldPrice,
      discount,
      discountActive,
      position,
      genderId,
      brandId,
      categoryId,
    });

    if (colors && colors.length > 0) {
      for (const colorId of colors) {
        const color = await this.colorModel.findByPk(colorId);
        if (!color) {
          throw new HttpException(`Color with ID ${colorId} not found`, HttpStatus.BAD_REQUEST);
        }
        await this.productColorModel.create({ productId: product.id, colorId });
      }
    }

    if (sizes && sizes.length > 0) {
      for (const sizeId of sizes) {
        const size = await this.sizeModel.findByPk(sizeId);
        if (!size) {
          throw new HttpException(`Size with ID ${sizeId} not found`, HttpStatus.BAD_REQUEST);
        }
        await this.productSizeModel.create({ productId: product.id, sizeId });
      }
    }

    const detailedProduct = await this.findOne(product.id);
    return detailedProduct;
  }

  findAll() {
    return this.productModel.findAll({
      include: [Category, SpColorPalitry, SpBrand, SpGender, SpSizeRate, ProductColor, ProductSize, ProductRecommendations],
    });
  }

  findOne(id: number) {
    return this.productModel.findByPk(id, {
      include: [Category, SpColorPalitry, SpBrand, SpGender, SpSizeRate, ProductColor, ProductSize, ProductRecommendations],
    });
  }
  async findByFilter(filters: any): Promise<Product[]> {
    try {
      const { genderId, categoryId, sizeId, colorId, priceMin, priceMax, collectionName } = filters;

      const where = {};

      if (genderId) {
        where['genderId'] = genderId;
      }

      if (categoryId) {
        where['categoryId'] = categoryId;
      }

      if (sizeId) {
        where['$productSizes.sizeId$'] = sizeId;
      }

      if (colorId) {
        where['$productColors.colorId$'] = colorId;
      }

      if (priceMin || priceMax) {
        where['price'] = {};
        if (priceMin) {
          where['price'][Op.gte] = priceMin;
        }
        if (priceMax) {
          where['price'][Op.lte] = priceMax;
        }
      }

      if (collectionName) {
        where['$brand.collectionName$'] = collectionName;
      }

      return await this.productModel.findAll({
        where,
        include: [
          { association: 'category' },
          { association: 'gender' },
          { association: 'productSizes' },
          { association: 'productColors' },
          { association: 'brand' },
        ],
      });
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
