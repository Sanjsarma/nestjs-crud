import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { createBookDto } from './dto/create-book-dto';
import { updateBookDto } from './dto/update-book-dto';

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
        return this.booksRepository.findOneBy({id: id});
    }

    create(createBookDto : createBookDto): Promise <Book> { //dto for validation
        let book = this.booksRepository.create({ name: createBookDto.name, author: createBookDto.author, isPresent: createBookDto.isPresent});
        return this.booksRepository.save(book);
    }
    
    async update(id: number, updateBookDto: updateBookDto): Promise <Book> {
        let book = await this.findById(id);
        if(!book){
            throw new Error(' no book found ');
        }
        book.name = updateBookDto.name;
        book.author = updateBookDto.author;
        book.isPresent = updateBookDto.isPresent;
        //let updatedBook = this.booksRepository.update(id, book );
        return this.booksRepository.save(book);
    }

    async delete(id: number): Promise<Book> {
        let book = await this.findById(id);
        if(!book){
            throw new Error(' no book found ');
        }

        return this.booksRepository.remove(book);
    }
}
