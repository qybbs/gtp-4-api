import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEmail, IsNotEmpty } from 'class-validator';
import { IsMatch } from 'src/common/validators';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'johndoe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Password must match',
    example: 'password',
  })
  @IsNotEmpty()
  @IsMatch('password')
  confpassword: string;
}
