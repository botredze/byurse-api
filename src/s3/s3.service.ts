import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File, bucket: string, key: string): Promise<string> {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location;
  }
}
