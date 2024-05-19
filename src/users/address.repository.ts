import { AddressDto } from "./dto/address.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "../database/models/address.model";

@Injectable()
export class AddressRepository{

  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address
  ) {
  }
  async createAddress(addressDto: AddressDto, userDetailsId: number): Promise<Address> {
    try {
      return await this.addressModel.create({ ...addressDto, userDetailsId });
    }catch (error){
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
