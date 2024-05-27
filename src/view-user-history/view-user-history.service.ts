import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ViewUserHistory } from '../database/models/view-user-history.model';
import { Product } from '../database/models/product.model';
import { User } from '../database/models/user.model';

@Injectable()
export class ViewUserHistoryService {
  constructor(
    @InjectModel(ViewUserHistory)
    private readonly viewUserHistoryModel: typeof ViewUserHistory,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async createViewHistory(userId: number, productId: number): Promise<ViewUserHistory> {
    try {
      const viewHistory = await this.viewUserHistoryModel.create({
        userId,
        productId,
        watchDate: new Date(),
      });
      return viewHistory;
    } catch (error) {
      throw new HttpException('Failed to create view history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserViewHistory(userId: number): Promise<ViewUserHistory[]> {
    return this.viewUserHistoryModel.findAll({
      where: { userId },
      include: [Product, User],
    });
  }
}
