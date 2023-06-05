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
    }),
    findOneBy: jest.fn(id => {
      let findBookDto = {name: 'abc', author: 'xyz', isPresent: true};
      return Promise.resolve({
        id: id.id,
        ...findBookDto
      })
    }),
    remove: jest.fn(dto => {
      return Promise.resolve({
        ...dto
      })
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
    let createBookDto = {name: 'book', author: 'sanj', isPresent: true};
    expect(await service.create(createBookDto)).toEqual({
      id: expect.any(Number),
      name: createBookDto.name,
      author: createBookDto.author,
      isPresent: createBookDto.isPresent
    })
  }); 

  it('should find a book by id', async() => {
    let id = 1;
    expect(await service.findById(id)).toMatchObject({
      id: expect.any(Number),
      name: 'abc',
      author: 'xyz',
      isPresent: true
    })
  });

  it('should update a book', async () => {
    let updateBookDto = {name: 'book', author: 'sanj', isPresent: false};
    let id = 1;
    expect(await service.update(id, updateBookDto)).toMatchObject({
      id: id,
      name:  updateBookDto.name,
      author: updateBookDto.author,
      isPresent: updateBookDto.isPresent
    });
  });

  it('should delete a book', async () => {
    let id = 1;
    let removeBookDto = {name: 'book', author: 'sanj', isPresent: false};
     expect(await service.delete(id)).toMatchObject({
       id: id,
       name: removeBookDto.name,
       author: removeBookDto.author,
       isPresent: removeBookDto.isPresent
     })
  })
});
