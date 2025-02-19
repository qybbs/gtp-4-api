import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'johndoe',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'password',
  })
  password: string;
}
