import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileTypes } from '../enums/file-types.enum';
import { Upload } from '../schemas/upload.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UploadsService {
  private s3: S3;

  constructor(
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const s3 = new S3();

    try {
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0];

    // Remove special white space characters
    name = name.replace(/\s, /g, '').trim();

    // Generate a time stamp
    const timestamp = new Date().getTime().toString().trim();

    // Extract file extension
    const extension = path.extname(file.originalname);

    // Return file uuid
    return `${name}-${timestamp}-${uuidv4()}${extension}${extension}`;
  }

  async uploadFileToS3(file: Express.Multer.File) {
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].indexOf(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
    }

    try {
      // Upload file to AWS S3
      const name = await this.uploadFile(file);

      //generate a new entry in the database
      const uploadFile = {
        name: name,
        path: `https://${process.env.AWS_CLOUDFRONT_URL}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = await this.uploadModel.create(uploadFile);
      return upload;
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
