import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileTypes } from '../enums/file-types.enum';

@Schema({
  collection: 'uploads',
  timestamps: true,
})
export class Upload extends Document {
  @Prop({ required: true, length: 1024 })
  name: string;

  @Prop({ required: true, length: 1024 })
  path: string;

  @Prop({
    required: true,
    enum: FileTypes,
    default: FileTypes.IMAGE,
  })
  type: FileTypes;

  @Prop({ required: true, length: 128 })
  mime: string;

  @Prop({ required: true, length: 1024 })
  size: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
