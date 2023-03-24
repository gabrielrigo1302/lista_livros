import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  birth: {
    type: String,
    required: true,
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

  @IsString({
    message: 'o campo username deve ser uma string',
  })
  username: string;

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
