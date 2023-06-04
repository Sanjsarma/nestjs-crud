import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'node:test';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const mockBooksService = {
    create: jest.fn(dto => { //mock create function in service
      return {
      id: Math.random(),
      ...dto
      }
    }),
    findAll: jest.fn(dto => {
      return {
        ...dto
      }
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto
      }
    })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService]
    }).overrideProvider(BooksService).useValue(mockBooksService).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', () => {
    let createBookDto = {name: 'book', author: 'sanj', isPresent: true};
    expect(controller.createBook(createBookDto)).toEqual({
      id: expect.any(Number),
      name: createBookDto.name, 
      author: createBookDto.author, 
      isPresent: createBookDto.isPresent
    })
    expect(mockBooksService.create).toHaveBeenCalled();
    expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
  })

  it('should update book by id', () => {
    expect(mockBooksService.update).toBeDefined();
    let updateBookDto = {name: 'book', author: 'sanj', isPresent: false };
    let id = 1;
    expect(controller.updateBook(id, updateBookDto)).toEqual({
      id: 1,
      ...updateBookDto
    })
    expect(mockBooksService.update).toHaveBeenCalled();

  })
});
