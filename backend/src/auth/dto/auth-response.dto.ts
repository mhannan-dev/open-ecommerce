import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
  access_token: string;

  @ApiProperty({
    example: {
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Hannan',
      email: 'sysadmin44@yopmail.com',
      can_login: true,
      image: null,
      created_at: '2025-02-22T15:43:49.000Z',
      updated_at: '2025-02-22T15:43:49.000Z'
    },
    description: 'Authenticated user details'
  })
  user: object;
}
