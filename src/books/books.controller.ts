import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create-book-dto';
import { updateBookDto } from './dto/update-book-dto';
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
    // standard http methods decorators - @Get, @Post, @Put, @Delete, @Patch, @Options, @Head
    //@All() - endpoint which handles all http methods
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

    @Post('create') //status code - 201
    //@HttpCode(204) //converts status code to 204
    @ApiOperation({summary : 'Create a book'})
    createBook(@Body() createBookDto: createBookDto) { //dedicated decorators - @Param, @Body, @Query can be used instead of @Request
    return this.booksService.create(createBookDto);
    }

    @Patch(':id') //update book by id
    @ApiOperation({summary : 'Update a book'})
    updateBook(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: updateBookDto){
    return this.booksService.update(id, updateBookDto);
    }

    @Delete(':id') //delete book
    @ApiOperation({summary : 'Delete a book'})
    deleteBook(@Param('id', ParseIntPipe) id: number){
        return this.booksService.delete(id);
    }
}
