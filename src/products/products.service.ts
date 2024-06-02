import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../database/models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../database/models/category.model';
import { SpBrand } from '../database/models/sp-brand.model';
import { ProductColor } from '../database/models/product-color.model';
import { ProductSize } from '../database/models/product-size.model';
import { ProductRecommendation } from '../database/models/product-recommendations.model';
import { Op } from 'sequelize';
import { ProductDetails } from '../database/models/product-details.model';
import { ProductPhoto } from '../database/models/product-photo.model';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(ProductColor) private readonly productColorModel: typeof ProductColor,
    @InjectModel(ProductSize) private readonly productSizeModel: typeof ProductSize,
    @InjectModel(ProductDetails) private readonly productDetailsModel: typeof ProductDetails,
    @InjectModel(ProductRecommendation) private readonly productRecommendationModel: typeof ProductRecommendation,
    @InjectModel(ProductPhoto) private readonly productPhotoModel: typeof ProductPhoto,
    private readonly s3Service: S3Service,
  ) {}

  async createProduct(data: CreateProductDto, files: Express.Multer.File[]): Promise<Product> {
    const { colors, sizes, recommendations, details, photos, ...productData } = data;

    try {
      const product = await this.productModel.create(productData);

      if (details) {
        await this.productDetailsModel.create({ ...details, productId: product.id });
      }

      if (colors && colors.length > 0) {
        await this.productColorModel.bulkCreate(
          colors.map(colorId => ({ productId: product.id, colorId }))
        );
      }

      if (sizes && sizes.length > 0) {
        await this.productSizeModel.bulkCreate(
          sizes.map(sizeId => ({ productId: product.id, sizeId }))
        );
      }

      if (recommendations && recommendations.length > 0) {
        await this.productRecommendationModel.bulkCreate(
          recommendations.map(recommendedProductId => ({
            productId: product.id,
            recommendedProductId,
          }))
        );
      }

      if (files && files.length > 0) {
        const photoUploads = await Promise.all(files.map(file =>
          this.s3Service.uploadFile(file, '188f78bd-byurse-bucket', `products/${product.id}/${file.originalname}`)
        ));

        await this.productPhotoModel.bulkCreate(
          photoUploads.map(url => ({
            productId: product.id,
            url,
          }))
        );
      } else if (photos && photos.length > 0) {
        await this.productPhotoModel.bulkCreate(
          photos.map(url => ({
            productId: product.id,
            url,
          }))
        );
      }

      return product;
    } catch (error) {
      throw new HttpException('Failed to create product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.productModel.findAll({
      include: [Category, SpBrand, ProductColor, ProductSize, ProductRecommendation, ProductPhoto],
    });
  }

  findOne(id: number) {
    return this.productModel.findByPk(id, {
      include: [Category, SpBrand, ProductColor, ProductSize, ProductRecommendation, ProductPhoto],
    });
  }

  async findByFilter(filters: any): Promise<Product[]> {
    try {
      const { genderId, categoryId, sizeId, colorId, priceMin, priceMax, collectionName } = filters;

      const where: any = {};

      if (genderId) {
        where.genderId = genderId;
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      if (sizeId) {
        where['$sizes.sizeId$'] = sizeId;
      }

      if (colorId) {
        where['$colors.colorId$'] = colorId;
      }

      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) {
          where.price[Op.gte] = priceMin;
        }
        if (priceMax) {
          where.price[Op.lte] = priceMax;
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
          { association: 'sizes' },
          { association: 'colors' },
          { association: 'brand' },
          { association: 'photos' },
        ],
      });
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
