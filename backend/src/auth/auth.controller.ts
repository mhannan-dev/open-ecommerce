import { 
  Controller, 
  Post, 
  Body, 
  BadRequestException, 
  Req, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ProfileUpdateDto } from './dto/profileUpdateDto.dto';
import { LocalAuthGuard } from './guards/local-auth.guard'; 

import { JwtAuthGuard } from './guards/jwt-auth.guard'; 

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login', description: 'Logs in a user and returns an access token.' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Successful login', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid credentials or missing fields' })
  async login(@Body() body: LoginDto) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Post('profile-update')
  @UseGuards(JwtAuthGuard)  // Using JwtAuthGuard here
  @ApiOperation({ summary: 'User Profile Update', description: 'Updates user profile information and returns an updated user object.' })
  @ApiBody({ type: ProfileUpdateDto })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Missing required fields' })
  async profileUpdate(@Req() req, @Body() body: ProfileUpdateDto) {
    const userId = req.user?.sub; // Ensure it's correctly extracted

    if (!userId) {
      throw new BadRequestException('User ID not found in token');
    }

    if (!body.first_name || !body.last_name) {
      throw new BadRequestException('First name and last name are required');
    }

    const updatedUser = await this.authService.updateUserProfile(userId, body);
    if (!updatedUser) {
      throw new BadRequestException('Profile update failed');
    }
    return this.authService.profileUpdateResponse(updatedUser);
  }
}