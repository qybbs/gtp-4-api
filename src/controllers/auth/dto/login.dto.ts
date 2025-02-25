import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsExist } from 'src/common/decorators';

export class LoginDto {
  @IsNotEmpty()
  @IsExist('User', 'username')
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
