import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cats.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
