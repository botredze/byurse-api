import { Module } from '@nestjs/common';
import {SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { UserDetails } from "../users/entity/user-details.model";
import { Address } from "../users/entity/address.model";
import { User } from "../users/entity/user.model";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      models: [UserDetails, Address, User],
    })
  ]
})
export class DatabaseModule {}
