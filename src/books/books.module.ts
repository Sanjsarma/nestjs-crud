import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], //forFeature() defines which repos are registered in the current scope
  controllers: [BooksController], //controller and service gets auto imported to module
  providers: [BooksService]
})
export class BooksModule {}
