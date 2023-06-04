import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sanjana',
      password: 'sanjana123',
      database: 'postgres',
      entities: [Book], //add entities 
      synchronize: true,
    //   migrations: [
    //       'dist/src/db/migrations/*.js' //where migrations are located
    //   ],
    //   migrationsTableName: "custom_migration_table",
    })
  ]
})
export class DatabaseModule {}