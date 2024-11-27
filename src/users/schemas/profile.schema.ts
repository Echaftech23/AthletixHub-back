import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  collection: 'profiles',
  timestamps: true,
})
export class Profile extends Document {
  @Prop({ required: false })
  age?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({
    type: {
      banner: { type: String },
      profileImage: { type: String },
    },
    required: false,
  })
  images?: {
    banner?: string;
    profileImage?: string;
  };

  @Prop({ required: false })
  bio?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: MongooseSchema.Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
