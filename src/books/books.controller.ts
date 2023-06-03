import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create-book-dto';
import { Book } from './book.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiResponse,
    ApiTags, } from '@nestjs/swagger';

@ApiTags('books')
@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@Controller('books')
export class BooksController {

    constructor(private booksService: BooksService) {} //injecting service
    @Get()
    getBooks(@Query('name') name: string){
        return this.booksService.findAll(name);
    }

    @ApiOkResponse({type: Book, description: 'book'})
    @ApiNotFoundResponse({
        status: 404,
        description: 'Not found'
    })
    @Get(':id')
    @ApiOperation({summary : 'Find a book by id'})
    async getBookById(@Param('id', ParseIntPipe) id: number){ //ParseIntPipe converts handler parameter to number, if not number, error is thrown before route handler is called
        const book = await this.booksService.findById(id);

        if(!book){
            throw new NotFoundException();
        }

        return book;
    }

    @Post('create')
    @ApiOperation({summary : 'Create a book'})
    createBook(@Body() createBookDto: createBookDto) {
    return this.booksService.create(createBookDto);
    }
}
