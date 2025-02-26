import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { IsExist } from 'src/common/decorators';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Title of the event',
    example: 'Event A',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Description of the event',
    example: 'This is an event A',
  })
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Date of the event',
    example: '2021-01-01',
  })
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsExist('Project', 'id')
  @ApiProperty({
    type: Number,
    description: 'Id of the event project',
    example: 1,
  })
  projectId: number;
}
