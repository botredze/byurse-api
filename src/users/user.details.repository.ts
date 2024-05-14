import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { UserDetails } from "./entity/user-details.model";
import { UserDetailsDto } from "./dto/user-details.dto";

@Injectable()
export class UserDetailsRepository {
  constructor(
    @InjectModel(UserDetails)
    private readonly userDetailsModel: typeof UserDetails,
  ) {}

  async createUserDetails(userDetailsDto: UserDetailsDto, userId: number): Promise<UserDetails> {
    try {
      return await this.userDetailsModel.create({ ...userDetailsDto, userId });
    } catch (error) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findById(id: number): Promise<UserDetails | null> {
    return this.userDetailsModel.findByPk(id);
  }
}
