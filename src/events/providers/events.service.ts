import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { UploadsService } from '@/uploads/providers/uploads.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    userId: string,
    file?: Express.Multer.File,
  ) {
    let imageUrl = createEventDto.imageUrl;
    if (file) {
      imageUrl = await this.uploadsService.uploadFileToS3(file);
    }

    const event = new this.eventModel({
      ...createEventDto,
      imageUrl,
      owner: new Types.ObjectId(userId),
    });
    return event.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  findOne(id: string) {
    return this.eventModel.findById(id).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
