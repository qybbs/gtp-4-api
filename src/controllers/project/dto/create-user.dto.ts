import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    description: 'Name of the project',
    example: 'Project A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the project',
    example: 'This is a project A',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
