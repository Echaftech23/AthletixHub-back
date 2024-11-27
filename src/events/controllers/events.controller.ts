import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { EventsService } from '../providers/events.service';
import { CreateEventDto } from '../dtos/create-event.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserIdInterceptor } from '@/auth/interceptors/user-id.interceptor';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    const userId = req.user.sub.toString();
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
