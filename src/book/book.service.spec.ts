import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './entities/book.entity';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: 'Book',
            schema: BookSchema,
          },
        ]),
      ],
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  describe('Create book service tests', () => {
    it('should be defined', () => {
      console.log('teste');

      expect(service).toBeDefined();
    });
  });
});
