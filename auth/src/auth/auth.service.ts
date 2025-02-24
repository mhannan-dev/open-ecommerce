import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(username: string, pass: string): Promise<any> {
        const user = await this.validateUser(username, pass);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            console.log('User not found for email:', email);  // Log if user is not found
            return null;
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password for email:', email);  // Log if password is invalid
            return null;
        }

        const { password, ...result } = user;  // Exclude password from the response
        console.log('User password validated:', result);  // Log user data after validation
        return result;
    }

}
