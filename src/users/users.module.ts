import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { OtpService } from '../otp/otp.service';
import { Address } from './entity/address.model';
import { UserDetails } from './entity/user-details.model';
import { User } from './entity/user.model';
import { UserDetailsRepository } from "./user.details.repository";
import { AddressRepository } from "./address.repository";

@Module({
  imports: [
    SequelizeModule.forFeature([Address, UserDetails, User]),
  ],
  providers: [UsersService, OtpService, UserRepository, UserDetailsRepository, AddressRepository],
  controllers: [AuthController, UsersController],
})
export class UsersModule {}
