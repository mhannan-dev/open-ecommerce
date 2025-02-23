import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  // Create User
  async create(createUserDto: CreateUserDto) {
    const { first_name,last_name, password, email } = createUserDto;
    
    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ first_name,last_name, email, password: hashedPassword });

    await this.userRepository.save(newUser); 
    return { message: 'User created successfully', user: newUser };
  }

  // Login User
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Find user in the database
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return { message: 'Login successful', user };
  }
}
