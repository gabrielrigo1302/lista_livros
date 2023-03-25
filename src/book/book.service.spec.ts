import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { AuthModule } from '../auth/auth.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './entities/book.entity';
import mockingoose from 'mockingoose';
import { Model } from 'mongoose';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          load: [configuration],
        }),
        MongooseModule.forRoot(process.env.DB_MONGO),
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

  describe('Find one book service tests', () => {
    it('should be defined', () => {
      const bookModel = new Model<Book>();

      mockingoose(bookModel).toReturn('teste');
      const a = service.findOne('');

      expect(a).toBe('');
    });
  });
});
