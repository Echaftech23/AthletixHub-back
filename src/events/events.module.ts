import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './providers/events.service';
import { EventsController } from './controllers/events.controller';
import { Event, EventSchema } from './schemas/event.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    JwtModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, JwtStrategy],
})
export class EventsModule {}
