import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> { // ✅ Fix: Implement `findOneById`
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async updateUser(user: User): Promise<User> { // ✅ Fix: Implement `updateUser`
    return this.usersRepository.save(user);
  }
}
