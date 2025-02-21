import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Get all event' })
  @Get()
  findAll() {
    return this.eventService.getAll();
  }

  @ApiOperation({ summary: 'Get one event' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  @ApiOperation({ summary: 'Post resource event' })
  @Post()
  create(@Body() CreateEventDto: CreateEventDto) {
    return this.eventService.create(CreateEventDto);
  }

  @ApiOperation({ summary: 'Update resource event' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateEventDto: UpdateEventDto) {
    return this.eventService.update(id, UpdateEventDto);
  }

  @ApiOperation({ summary: 'Delete resource event' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.eventService.delete(id);
  }
}
