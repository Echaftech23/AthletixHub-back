import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './providers/events.service';
import { EventsController } from './controllers/events.controller';
import { Event, EventSchema } from './schemas/event.schema';
import { UserIdInterceptor } from '@/auth/interceptors/user-id.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, UserIdInterceptor],
})
export class EventsModule {}
