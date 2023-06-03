import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class createBookDto { 
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsBoolean()
  @ApiProperty()
  isPresent: boolean;
}