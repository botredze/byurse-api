import { Injectable } from '@nestjs/common';
import { SmsAero, SmsAeroError, SmsAeroHTTPError } from 'smsaero';
import { UserRepository } from "../users/user.repository";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class OtpService {
  private readonly smsAeroClient: SmsAero;

  constructor(
    private readonly userRepository: UserRepository,
  ) {
    this.smsAeroClient = new SmsAero(process.env.SMSAERO_EMAIL, process.env.SMSAERO_API_KEY);
  }

  async generateAndSendOTP(phone: string) : Promise<void> {
    const min = 1000;
    const max = 9999;
    const otp = (Math.floor(Math.random() * (max - min + 1)) + min).toString()

    try {
      await this.sendOTP(phone, otp);
      await this.saveOTP(phone, otp);
    } catch (error) {
      throw new Error('Error sending OTP');
    }
  }

  async sendOTP(phoneNumber: string, otp: string): Promise<void> {
    try {
      await this.smsAeroClient.send(phoneNumber, `Ваш код для входа в Byurse: ${otp} n/n/ введите в поле в окне регистрации`);
    } catch (error) {
      if (error instanceof SmsAeroError) {
        throw new Error(`SmsAero error: ${error.message}`);
      } else if (error instanceof SmsAeroHTTPError) {
        throw new Error(`HTTP error: ${error.message}`);
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }

  private async saveOTP(phone: string, otp: string): Promise<void> {
    await this.userRepository.createUser({ otp, phone });
  }

  async verifyOTP(phone: string, otp: string): Promise<boolean> {
    const user = await this.userRepository.findByPhone(phone);
    return !!user && user.otp === otp;
  }
}
