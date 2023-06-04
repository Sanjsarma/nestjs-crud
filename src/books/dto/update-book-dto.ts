import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class updateBookDto { 
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