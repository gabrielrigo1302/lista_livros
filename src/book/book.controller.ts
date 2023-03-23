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
import { BookBody, RentBookQuery } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() body: BookBody) {
    return this.bookService.create(body);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: BookBody) {
    return this.bookService.update(id, body);
  }

  @Put('rent/:id')
  rentBook(@Param('id') id: string, @Query() query: RentBookQuery) {
    return this.bookService.updateBookRent(id, query.rentedBy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
