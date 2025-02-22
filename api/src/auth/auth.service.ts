import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate the user credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (user) {
      // Exclude password from the user object before returning
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Return the access token and the user object
  async login(user: any) {
    // Create payload for JWT token (can include other fields as necessary)
    const payload = { email: user.email, sub: user.id };

    // Create the JWT token
    const accessToken = this.jwtService.sign(payload);

    // Return both the access token and user information
    return {
      access_token: accessToken,
      user, // Include user object in the response
    };
  }
}
