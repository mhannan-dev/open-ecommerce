import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Post('login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return this.usersService.login(loginUserDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return await this.usersService.getUsers(
      Number(page),
      Number(limit),
      search,
    );
  }
}
