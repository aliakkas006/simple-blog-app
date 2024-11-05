import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.createUser(createUserDto);

    // Create a JWT token for the new user
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Method to authenticate a user and return a JWT token
  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    // Find the user by email
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return a JWT token
    const payload = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
