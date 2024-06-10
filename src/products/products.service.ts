import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "../database/models/product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { Category } from "../database/models/category.model";
import { SpBrand } from "../database/models/sp-brand.model";
import { ProductColor } from "../database/models/product-color.model";
import { ProductSize } from "../database/models/product-size.model";
import { ProductRecommendation } from "../database/models/product-recommendations.model";
import { Op } from "sequelize";
import { ProductDetails } from "../database/models/product-details.model";
import { ProductPhoto } from "../database/models/product-photo.model";
import { S3Service } from "../s3/s3.service";
import { SpColorPalitry } from "../database/models/sp-color-palitry.model";
import { SpSizeRate } from "../database/models/sp-size-rate.model";
import { plainToClass } from "class-transformer";
import { Sequelize } from "sequelize-typescript";
import { Rating } from "../database/models/rating.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(ProductColor) private readonly productColorModel: typeof ProductColor,
    @InjectModel(ProductSize) private readonly productSizeModel: typeof ProductSize,
    @InjectModel(ProductDetails) private readonly productDetailsModel: typeof ProductDetails,
    @InjectModel(ProductRecommendation) private readonly productRecommendationModel: typeof ProductRecommendation,
    @InjectModel(ProductPhoto) private readonly productPhotoModel: typeof ProductPhoto,
    @InjectModel(Rating) private readonly ratingModel: typeof Rating,
    private readonly s3Service: S3Service
  ) {
  }

   generateArticul() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let result = '';
    for (let i = 0; i < 3; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 7; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }


  async createProduct(data: CreateProductDto, files: Express.Multer.File[]): Promise<Product> {
    console.log(data);
    const { colors, sizes, recommendations, photos, ...productData } = data;

    const details = {
      description: data['details.description'],
      material: data['details.material'],
      country: data['details.country']
    };

    try {
      const product = await this.productModel.create(productData);

      await this.ratingModel.create({ productId: product.id, rate: 10 });

      if (details) {
        const articul = this.generateArticul();
        await this.productDetailsModel.create({ ...details, productId: product.id, articul });
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

      console.log(recommendations && recommendations.length > 1);
      if (recommendations && recommendations.length > 1) {
        await this.productRecommendationModel.bulkCreate(
          recommendations.map(recommendedProductId => ({
            productId: product.id,
            recommendedProductId
          }))
        );
      }


      if (files && files.length > 0) {
        const photoUploads = await Promise.all(files.map(file =>
          this.s3Service.uploadFile(file, "188f78bd-byurse-bucket", `products/${product.id}/${file.originalname}`)
        ));

        await this.productPhotoModel.bulkCreate(
          photoUploads.map((url, index) => ({
            productId: product.id,
            url,
            main: index === 0
          }))
        );
      } else if (photos && photos.length > 0) {
        await this.productPhotoModel.bulkCreate(
          photos.map((url, index) => ({
            productId: product.id,
            url,
            main: index === 0
          }))
        );
      }

      return product;
    } catch (error) {
      console.log('error', error);
      throw new HttpException("Failed to create product", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  findAll() {
    return this.productModel.findAll({
      include: [
        Category,
        SpBrand,
        ProductPhoto
      ]
    }).then(products => {
      return products.map(product => ({
        ...product.get()
      }));
    });
  }


  findOne(id: number) {
    return this.productModel.findByPk(id, {
      include: [
        Category,
        SpBrand,
        {
          model: ProductColor,
          attributes: ["colorId"],
          include: [{ model: SpColorPalitry, attributes: ["id", "color"] }]
        },
        {
          model: ProductSize,
          attributes: ["sizeId"],
          include: [{ model: SpSizeRate, attributes: ["id", "sizeName"] }]
        },
        ProductRecommendation,
        ProductPhoto
      ]
    }).then(product => {
      if (product) {
        return {
          ...product.get(),
          colors: product.colors.map(color => ({ id: color.colorId, color: color.color.color })),
          sizes: product.sizes.map(size => ({ id: size.sizeId, sizeName: size.size.sizeName }))
        };
      }
      return null;
    });
  }

  async findByFilter(filters: any): Promise<any> {
    try {
      const { genderId, categoryId, sizeId, colorId, priceMin, priceMax, collectionId, sorting } = filters;

      const where: any = {};

      console.log(genderId, categoryId, sizeId, colorId, priceMin, priceMax, collectionId, sorting);
      if (genderId != 0 && genderId) {
        where.genderId = genderId;
      }

      if (categoryId != 0 && categoryId) {
        where.categoryId = categoryId;
      }

      if (sizeId != 0 && sizeId) {
        where["$sizes.sizeId$"] = sizeId;
      }

      if (colorId != 0 && colorId) {
        where["$colors.colorId$"] = colorId;
      }

      if (priceMin != 0 || priceMax != 0) {
        where.price = {};
        if (priceMin) {
          where.price[Op.gte] = priceMin;
        }
        if (priceMax) {
          where.price[Op.lte] = priceMax;
        }
      }

      if (collectionId != 0 && collectionId && collectionId != 2) {
        where.brandId = collectionId;
      }

      let sortCriteria = [];
      if (sorting) {
        console.log(typeof  sorting);
        switch (sorting ) {
          case '1':
            sortCriteria.push(['price', 'ASC']);
            break;
          case '2':
            sortCriteria.push([Sequelize.col('rate'), 'DESC']);
            break;
          case '3':
            sortCriteria.push(['createdAt', 'DESC']);
            break;
          default:
            break;
        }
      }

      const products = await Product.findAll({
        where,
        include: [
          { association: "category" },
          { association: "gender" },
          {
            model: ProductSize,
            attributes: ["sizeId"],
            include: [{ model: SpSizeRate, attributes: ["id", "sizeName"] }]
          },
          {
            model: ProductColor,
            attributes: ["colorId"],
            include: [{ model: SpColorPalitry, attributes: ["id", "color"] }]
          },
          { association: "brand" },
          { association: "photos" },
          {
            model: Rating,
            attributes: ["rate"]
          }
        ],
        order: sortCriteria
      });

      const prices = await Product.findAll({
        where,
        attributes: [
          [Sequelize.fn('MIN', Sequelize.col('price')), 'minPrice'],
          [Sequelize.fn('MAX', Sequelize.col('price')), 'maxPrice']
        ]
      });

      const minPrice = prices[0].get('minPrice');
      const maxPrice = prices[0].get('maxPrice');

      const result = {
        products: products.map(product => ({
          ...product.get(),
          colors: product.colors.map(color => ({ id: color.colorId, color: color.color.color })),
          sizes: product.sizes.map(size => ({ id: size.sizeId, sizeName: size.size.sizeName })),
          rating: product.rating.rate ? product.rating.rate : null
        })),
        minPrice,
        maxPrice
      };

      return result;

    } catch (error) {
      console.log(error);
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}


