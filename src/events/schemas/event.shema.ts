import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({
  collection: 'events',
  timestamps: true,
})
export class Event extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  date: Date;

  @Prop({
    required: true,
    trim: true,
  })
  location: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  capacity: number;

  @Prop({
    required: true,
    trim: true,
  })
  image: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    default: [],
  })
  participants: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
