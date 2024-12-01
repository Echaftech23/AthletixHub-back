import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParticipantService } from '@/participants/providers/participants.service';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { UpdateParticipantDto } from '../dtos/update-participant.dto';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  async findAll() {
    return this.participantService.findAll();
  }

  @Post()
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.participantService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.participantService.delete(id);
  }
}
