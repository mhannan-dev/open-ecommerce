/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Find User by email
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException('Error finding user by email');
    }
  }

  // Create User
  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, password, email } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    return { message: 'User created successfully', user: { ...newUser, password: undefined } };
  }

  // Get all users with pagination and search
  async getUsers(page: number = 1, limit: number = 10, search?: string) {
    const whereCondition = search
      ? [
          { first_name: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ]
      : {};

    const [users, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      take: limit,
      skip: (page - 1) * limit,
      order: { id: 'DESC' },
    });

    return {
      data: users,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // Login User
  // async login(loginUserDto: LoginUserDto) {
  //   console.log(loginUserDto);
  //   const { email, password } = loginUserDto;
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   const { password: _, ...result } = user;
  //   return { message: 'Login successful', user: result };
  // }
}
