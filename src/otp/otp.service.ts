import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import * as dotenv from 'dotenv';
import { UserRepository } from "../users/user.repository";
dotenv.config();

@Injectable()
export class OtpService {
  private readonly twilioClient: any;

  constructor(
    private readonly userRepository: UserRepository,
  ) {
    this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
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
      await this.twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
    } catch (error) {
      throw new Error('Error sending OTP');
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
