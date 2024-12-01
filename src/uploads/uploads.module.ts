import { Module } from '@nestjs/common';
import { UploadsService } from './providers/uploads.service';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
