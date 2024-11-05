import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route to get user details (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') userId: number) {
    return this.userService.findUserById(userId);
  }
}
