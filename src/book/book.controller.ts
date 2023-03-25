import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { BookService } from './book.service';
import {
  BookBody,
  BookFilterQuery,
  RentBookQuery,
} from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: BookBody) {
    return await this.bookService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: BookFilterQuery) {
    return await this.bookService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: BookBody) {
    return await this.bookService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('rent/:id')
  async rentBook(@Param('id') id: string, @Query() query: RentBookQuery) {
    return await this.bookService.updateBookRent(id, query.rentedBy);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
