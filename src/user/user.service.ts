import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserBody } from './entities/user.entity';
import { errorMessage, NotFoundError } from '../utils/utils';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(body: UserBody) {
    try {
      const result = await new this.userModel(body).save();
      return result.id;
    } catch (error) {
      if (error.code === 11000)
        throw errorMessage(HttpStatus.CONFLICT, 'Username já cadastrado');

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.userModel.findById(id).exec();

      if (!response) throw new NotFoundError();

      return response;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async findOneByUsername(username: string) {
    try {
      const response = await this.userModel
        .findOne({
          username,
        })
        .exec();

      if (!response) throw new NotFoundError();

      return response;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async update(id: string, body: UserBody) {
    try {
      await this.findOne(id);
      await this.userModel.updateOne({ _id: id }, body).exec();

      return this.findOne(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      await this.userModel.deleteOne({ _id: id }).exec();

      return this.findOne(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw errorMessage(error.status, error.message);
      }

      throw errorMessage(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno');
    }
  }
}
