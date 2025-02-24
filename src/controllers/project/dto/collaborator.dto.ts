import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CollaboratorDto {
  @ApiProperty({
    type: Number,
    description: 'Id of the user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'Id of the project',
  })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
