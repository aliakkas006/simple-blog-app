import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    // Check if the email is already in use
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and return the new user
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  // Find the user by email
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async findUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }
}
