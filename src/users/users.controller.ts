import { Body, Controller, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDetailsDto } from "./dto/user-details.dto";
import { AddressDto } from "./dto/address.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { UserDetailsRepository } from "./user.details.repository";
import { AddressRepository } from "./address.repository";

@Controller("users")
@ApiTags("User Details")
export class UsersController {
  constructor(
    private readonly userDetails: UserDetailsRepository,
    private readonly address: AddressRepository
  ) {
  }

  @Post(":userId")
  @ApiOperation({ summary: "Create User Details" })
  @ApiParam({ name: "userId", type: Number })
  @ApiBody({ type: UserDetailsDto })
  @ApiResponse({ status: 201, description: "User details created successfully" })
  @ApiBadRequestResponse({ description: "Invalid input" })
  @Post(":userId")
  async createUserDetails(@Body() userDetailsDto: UserDetailsDto, @Param("userId") userId: number) {
    try {
      return this.userDetails.createUserDetails(userDetailsDto, userId);
    } catch (error) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':userDetailsId')
  @ApiOperation({ summary: 'Create Address' })
  @ApiParam({ name: 'userDetailsId', type: Number })
  @ApiBody({ type: AddressDto })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createAddress(@Body() addressDto: AddressDto, @Param("userDetailsId") userDetailsId: number) {
    try {
      return this.address.createAddress(addressDto, userDetailsId);
    } catch (error) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
