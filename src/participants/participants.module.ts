import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantService } from './providers/participants.service';
import { ParticipantController } from './controllers/participants.controller';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { Event, EventSchema } from '../events/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantsModule {}
