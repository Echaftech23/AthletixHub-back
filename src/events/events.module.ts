import { Module } from '@nestjs/common';
import { EventsService } from './providers/events.service';
import { EventsController } from './controllers/events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
