import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileUpdateDto } from './dto/profileUpdateDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async updateUserProfile(userId: number, updateData: ProfileUpdateDto): Promise<any> {
    const user = await this.usersService.findOneById(userId); // ✅ Fix: Use `findOneById`
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.first_name = updateData.first_name || user.first_name;
    user.last_name = updateData.last_name || user.last_name;
    user.image = updateData.image || user.image;

    const updatedUser = await this.usersService.updateUser(user); // ✅ Fix: Use `updateUser`

    const { password, ...result } = updatedUser;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      data: {
        access_token: accessToken,
        user,
      }
    };
  }

  async profileUpdateResponse(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      data: {
        access_token: accessToken,
        user,
      }
    };
  }
}
