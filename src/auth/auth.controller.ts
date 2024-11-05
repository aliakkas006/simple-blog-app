import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Route to register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // Route to login a user
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
