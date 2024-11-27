import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsService } from './providers/events.service';
import { EventsController } from './controllers/events.controller';
import { Event, EventSchema } from './schemas/event.schema';
import { UserIdInterceptor } from '@/auth/interceptors/user-id.interceptor';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService, UserIdInterceptor],
})
export class EventsModule {}
