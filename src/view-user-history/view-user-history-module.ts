import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewUserHistory } from '../database/models/view-user-history.model';
import { User } from '../database/models/user.model';
import { Product } from '../database/models/product.model';
import { ViewUserHistoryService } from './view-user-history.service';
import { ViewUserHistoryController } from './view-user-history.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([ViewUserHistory, User, Product]),
  ],
  providers: [ViewUserHistoryService],
  controllers: [ViewUserHistoryController],
})
export class ViewUserHistoryModule {}
