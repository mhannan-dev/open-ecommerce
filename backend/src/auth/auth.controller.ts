import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('[AuthController] Received login request for:', body);

    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }

    // Validate the user credentials
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Return access token and user object
    return this.authService.login(user);
  }
}
