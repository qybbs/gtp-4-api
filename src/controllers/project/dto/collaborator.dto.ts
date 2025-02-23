import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CollaboratorDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
