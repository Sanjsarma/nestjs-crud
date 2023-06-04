import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

//dto defines how data will be sent over network
//use classes as classes are real entities during js compilation
//ts interfaces are removed and nest cannot refer them at runtime
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