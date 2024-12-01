import { Types } from 'mongoose';

export class CreateParticipantDto {
  username: string;
  phone: string;
  email: string;
  eventId: Types.ObjectId;
}
