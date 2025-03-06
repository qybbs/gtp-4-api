import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import {
  BadReqRegisterResponse,
  EmptyRequestResponse,
  LoginSuccessResponse,
  RegisterSuccessResponse,
  WrongLoginResponse,
} from 'src/common/responses';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register', description: 'Register a new user' })
  @ApiOkResponse(RegisterSuccessResponse)
  @ApiBadRequestResponse(BadReqRegisterResponse)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login with username and password',
  })
  @ApiOkResponse(LoginSuccessResponse)
  @ApiBadRequestResponse(EmptyRequestResponse)
  @ApiUnauthorizedResponse(WrongLoginResponse)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
