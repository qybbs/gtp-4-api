import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Login' })
  @Post('login')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({ description: 'Logged in Succesfully!' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @ApiOperation({ summary: 'Register' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({ description: 'Registered Succesfully!' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
