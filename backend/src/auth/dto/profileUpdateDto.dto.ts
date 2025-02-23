import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class ProfileUpdateDto {
  @ApiProperty({ example: 'Muhammad', description: 'User first name' })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @ApiProperty({ example: 'Hannan', description: 'User last name' })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'User profile image URL',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL format' })
  image?: string;
}
