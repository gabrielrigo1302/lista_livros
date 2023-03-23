import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserBody } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(body: UserBody) {
    try {
      const result = await new this.userModel(body).save();
      return result.id;
    } catch (error) {
      if (error.code === 1100) {
        throw new HttpException(
          {
            error: HttpStatus.CONFLICT,
            message: 'Email já existe',
          },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          error: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(
        {
          error: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro interno',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.userModel.findById(id).exec();

      if (response) {
        throw new HttpException(
          {
            error: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro interno',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return response;
    } catch (error) {
      console.log('error --- ', error);
    }
  }

  async update(id: string, body: UserBody) {
    const user: User = await this.findOne(id);

    if (!user) return null;

    await this.userModel.updateOne({ _id: id }, body).exec();
    return this.findOne(id);
  }

  async remove(id: string) {
    const user: User = await this.findOne(id);

    if (!user) return null;

    await this.userModel.deleteOne({ _id: id }).exec();
    return this.findOne(id);
  }
}
