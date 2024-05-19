import { Module } from '@nestjs/common';
import { DatabaseModule } from "./database/database.config";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, UsersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
