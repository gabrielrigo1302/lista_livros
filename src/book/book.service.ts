import { BookBody, BookDoc, BookFilterQuery } from './entities/book.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { errorMessage, ForbiddenError, NotFoundError } from '../utils/utils';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(body: BookBody): Promise<string> {
    try {
      const book: BookDoc = {
        ...body,
        rentedBy: null,
      };

      const result = await new this.bookModel(book).save();
      return result.id;
    } catch (error) {
      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async findAll(query: BookFilterQuery): Promise<Book[]> {
    try {
      return await this.bookModel.find(query).exec();
    } catch (error) {
      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      const response = await this.bookModel.findById(id).exec();

      if (!response) throw new NotFoundError();

      return response;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async update(id: string, body: BookBody): Promise<Book> {
    try {
      await this.findOne(id);
      await this.bookModel.updateOne({ _id: id }, body).exec();
      return this.findOne(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async updateBookRent(id: string, rentedBy: string): Promise<Book> {
    try {
      const book: Book = await this.findOne(id);

      if (book.rentedBy) throw new ForbiddenError('O livro já está alugado');
      if (book.rentedBy === rentedBy) return book;

      const bookUpdated: BookDoc = {
        name: book.name,
        author: book.author,
        pagesNumber: book.pagesNumber,
        year: book.year,
        rentedBy: rentedBy,
      };

      await this.bookModel.updateOne({ _id: id }, bookUpdated).exec();

      return this.findOne(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      if (error.status === HttpStatus.FORBIDDEN) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async remove(id: string) {
    try {
      const book: Book = await this.findOne(id);

      if (book.rentedBy) throw new ForbiddenError('O livro já está alugado');

      return await this.bookModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      if (error.status === HttpStatus.FORBIDDEN) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }
}
