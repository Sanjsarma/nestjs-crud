import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';


@Module({
  imports: [DatabaseModule, //import database module
    BooksModule, TodosModule], //gets auto imported while using nest-cli for creating 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
