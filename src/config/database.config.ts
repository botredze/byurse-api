import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeConfigService } from './sequelize-config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, SequelizeConfigService],
  exports: [ConfigService],
})
export class MyConfigModule {}
