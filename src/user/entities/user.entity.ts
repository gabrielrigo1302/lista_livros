import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export class UserBody {
  @IsString({
    message: 'o campo name deve ser uma string',
  })
  name: string;

  @IsString({
    message: 'o campo birth deve ser uma string',
  })
  birth: string;

  @IsEmail(
    {},
    {
      message: 'o campo email deve ser uma string com formatação de email',
    },
  )
  email: string;

  @IsString({
    message: 'o campo password deve ser uma string',
  })
  password: string;
}

export class User extends PartialType(UserBody) {
  @IsString({
    message: 'o campo id deve ser uma string',
  })
  id: string;
}
