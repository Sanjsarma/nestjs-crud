import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  const mockBooksRepository = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => {
      return Promise.resolve({id: Math.random(), ...dto})
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, 
      {    
        provide: getRepositoryToken(Book), //for mocking repositories
        useValue: mockBooksRepository
      },
    ]
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async() => {
    let updateBookDto = {name: 'book', author: 'sanj', isPresent: true};
    expect(await service.create(updateBookDto)).toEqual({
      id: expect.any(Number),
      name: updateBookDto.name,
      author: updateBookDto.author,
      isPresent: updateBookDto.isPresent
    })
  } )
});
