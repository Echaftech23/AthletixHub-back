import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Participant } from '../../participants/schemas/participant.schema';

@Schema({
  collection: 'events',
  timestamps: true,
})
export class Event extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

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
  time: string;

  @Prop({
    type: {
      venue: { type: String, required: true, trim: true },
      location: { type: String, required: true, trim: true },
    },
    required: true,
  })
  address: {
    venue: string;
    location: string;
  };

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
  imageUrl: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Participant' }],
    default: [],
  })
  participants: Participant[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
