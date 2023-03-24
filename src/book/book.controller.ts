import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  BookBody,
  BookFilterQuery,
  RentBookQuery,
} from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() body: BookBody) {
    return await this.bookService.create(body);
  }

  @Get()
  async findAll(@Query() query: BookFilterQuery) {
    return await this.bookService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: BookBody) {
    return await this.bookService.update(id, body);
  }

  @Put('rent/:id')
  async rentBook(@Param('id') id: string, @Query() query: RentBookQuery) {
    return await this.bookService.updateBookRent(id, query.rentedBy);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
