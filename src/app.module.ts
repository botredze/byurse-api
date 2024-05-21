import { Module } from '@nestjs/common';
import { DatabaseModule } from "./database/database.config";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from './products/products.module';
import { ReferenceDataModule } from "./referenct-data/referenct-data.module";

@Module({
  imports: [DatabaseModule, UsersModule, ProductsModule, ReferenceDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
