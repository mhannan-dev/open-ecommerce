import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('Email:', email);  // Log the email received
    console.log('Password:', password);  // Log the password received

    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      console.log('Invalid email or password');  // Log if no user found
      throw new Error('Unauthorized');
    }

    console.log('User validated:', user);  // Log the validated user
    return user;
  }
}
