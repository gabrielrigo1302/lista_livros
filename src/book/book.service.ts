import { BookBody, BookDoc } from './entities/book.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(body: BookBody): Promise<string> {
    const book: BookDoc = {
      ...body,
      rentedBy: null,
    };

    const result = await new this.bookModel(book).save();
    return result.id;
  }

  async findAll(query: string): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async update(id: string, body: BookBody): Promise<Book> {
    const book: Book = await this.findOne(id);

    if (book.rentedBy) {
      // retornar mensagem dizendo que não pode ser alugado porque já foi
      return null;
    }

    await this.bookModel.updateOne({ _id: id }, body).exec();
    return this.findOne(id);
  }

  async updateBookRent(id: string, rentedBy: string): Promise<Book> {
    const book: Book = await this.findOne(id);

    if (book.rentedBy)
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);

    if (book.rentedBy === rentedBy) return book;

    const bookUpdated: BookDoc = {
      ...book,
      rentedBy,
    };

    await this.bookModel.updateOne({ _id: id }, bookUpdated).exec();

    return this.findOne(id);
  }

  async remove(id: string) {
    const book: Book = await this.findOne(id);

    if (book.rentedBy) {
      // retornar mensagem dizendo que não pode ser alugado porque já foi
      return null;
    }

    return await this.bookModel.deleteOne({ _id: id }).exec();
  }
}
