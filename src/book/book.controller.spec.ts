import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import configuration from '../config/configuration';
import { BookController } from './book.controller';
import { BookModule } from './book.module';
import { BookService } from './book.service';
import { BookSchema } from './entities/book.entity';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
      imports: [
        AuthModule,
        BookModule,
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
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  describe('Create book tests', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
