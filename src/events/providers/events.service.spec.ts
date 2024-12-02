import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { Types } from 'mongoose';
import { UpdateEventDto } from '../dtos/update-event.dto';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventModel: any;
  let mockUploadsService: any;

  beforeEach(async () => {
    // Mock implementations for Event Model
    mockEventModel = {
      new: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      save: jest.fn(),
      exec: jest.fn(),
    };

    // Mock implementations for Uploads Service
    mockUploadsService = {
      uploadFileToS3: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
        {
          provide: UploadsService,
          useValue: mockUploadsService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const mockEvents = [
        { title: 'Event 1' } as Event,
        { title: 'Event 2' } as Event,
      ];

      mockEventModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvents),
      });

      const result = await service.findAll();

      expect(result).toEqual(mockEvents);
      expect(mockEventModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single event by ID', async () => {
      const mockEventId = new Types.ObjectId().toString();
      const mockEvent = { _id: mockEventId, title: 'Test Event' } as Event;

      mockEventModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockEvent),
        }),
      });

      const result = await service.findOne(mockEventId);

      expect(result).toEqual(mockEvent);
      expect(mockEventModel.findById).toHaveBeenCalledWith(mockEventId);
      expect(mockEventModel.findById().populate).toHaveBeenCalledWith('participants', 'username email phone');
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const mockEventId = new Types.ObjectId().toString();
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
        description: 'Updated Description',
        date: new Date(),
        address: 'Updated Location',
        time: '1:00 PM',
        price: 20,
        capacity: 200,
        imageUrl: 'https://example.com/updated-image.jpg',
      };

      const mockUpdatedEvent = {
        _id: mockEventId,
        ...updateEventDto,
      } as Event;

      mockEventModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUpdatedEvent),
      });

      const result = await service.update(mockEventId, updateEventDto);

      expect(result).toEqual(mockUpdatedEvent);
      expect(mockEventModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockEventId,
        updateEventDto,
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      const mockEventId = new Types.ObjectId().toString();
      const mockDeletedEvent = { _id: mockEventId } as Event;

      mockEventModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeletedEvent),
      });

      const result = await service.remove(mockEventId);

      expect(result).toEqual(mockDeletedEvent);
      expect(mockEventModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockEventId,
      );
    });
  });
});
