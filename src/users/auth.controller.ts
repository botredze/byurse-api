import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from "../otp/otp.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP' })
  @ApiBody({ schema: { example: { phone: '+1234567890' } } })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async sendOTP(@Body('phone') phone: string) {
    try {
      await this.otpService.generateAndSendOTP(phone);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ schema: { example: { phone: '+1234567890', otp: '1234' } } })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiBadRequestResponse({ description: 'Invalid OTP' })
  async verifyOTP(@Body('phone') phone: string, @Body('otp') otp: string) {
    try {
      const isVerified = await this.otpService.verifyOTP(phone, otp);
      if (isVerified) {
        return { message: 'OTP verified successfully' };
      } else {
        return { error: 'Invalid OTP' };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}
