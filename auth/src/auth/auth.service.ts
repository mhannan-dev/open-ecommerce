/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
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
            status: "success",
            message: 'Login successful',
            data: {
                access_token: this.jwtService.sign(payload),
                user,
            }
        };
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            console.log('User not found for email:', email);
            return null;
        }
        console.log('auth service', process.env.JWT_SECRET);
        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password for email:', email);
            return null;
        }

        const { password: _, ...result } = user;
        return result;
    }
}
