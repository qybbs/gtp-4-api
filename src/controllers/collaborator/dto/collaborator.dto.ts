import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsExist } from 'src/common/decorators';

export class CollaboratorDto {
  @ApiProperty({
    type: Number,
    description: 'Id of the project',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsExist('Project', 'id')
  projectId: number;

  @ApiProperty({
    type: Number,
    description: 'Id of the user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsExist('User', 'id')
  userId: number;
}
