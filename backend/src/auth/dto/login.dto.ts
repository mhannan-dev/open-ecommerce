import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'sysadmin44@yopmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}
