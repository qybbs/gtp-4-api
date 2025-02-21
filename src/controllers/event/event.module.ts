import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { eventProvider } from 'src/common/providers';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, eventProvider],
  exports: [EventService],
})
export class EventModule {}
