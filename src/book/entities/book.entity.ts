import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsInt, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  pagesNumber: {
    type: Number,
    required: false,
  },
  rentedBy: {
    type: String,
    required: false,
  },
});

export class BookBody {
  @IsString({
    message: 'o campo name deve ser uma string',
  })
  name: string;

  @IsInt({ message: 'o campo year deve ser um decimal' })
  @IsOptional()
  year: number;

  @IsString({
    message: 'o campo author deve ser uma string',
  })
  @IsOptional()
  author: string;

  @IsInt({ message: 'o campo pagesNumber deve ser um decimal' })
  @IsOptional()
  pagesNumber: number;
}

export class BookDoc extends PartialType(BookBody) {
  @IsString({
    message: 'o campo rentedBy deve ser uma string',
  })
  @IsOptional()
  rentedBy: string;
}

export class Book extends PartialType(BookDoc) {
  @IsString({
    message: 'o campo id deve ser uma string',
  })
  id: string;
}

export class RentBookQuery {
  @IsString({
    message: 'o campo rentedBy deve ser uma string',
  })
  @IsOptional()
  rentedBy: string;
}
