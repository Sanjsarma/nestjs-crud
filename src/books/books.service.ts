import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { createBookDto } from './dto/create-book-dto';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {}

    findAll(name?: string): Promise<Book[] | Book> {
        if(name) {
            return this.booksRepository.findOne({where: {name: name}});
        }
        return this.booksRepository.find();
    }

    findById(id: number): Promise<Book | null> {
        return this.booksRepository.findOneBy({id});
    }

    create(createBookDto : createBookDto): Promise <Book> { //dto for validation
        let book = this.booksRepository.create({ name: createBookDto.name, author: createBookDto.author, isPresent: createBookDto.isPresent});
        return this.booksRepository.save(book);
    }
    
}
