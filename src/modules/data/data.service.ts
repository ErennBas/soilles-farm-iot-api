import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';
import { Between, MoreThan, Repository } from 'typeorm';

@Injectable()
export class DataService {

  constructor(@InjectRepository(DataEntity) private dataRepository: Repository<DataEntity>) {}

  async create(createDataDto: CreateDataDto): Promise<DataEntity> {
    return this.dataRepository.save(createDataDto);
  }

  async findOne(): Promise<DataEntity> {
    return this.dataRepository.findOne({ where: { id: MoreThan(0) }, order: { createdDate: 'DESC' } });
  }

  async find(): Promise<DataEntity[]> {
    const today = new Date();
    return this.dataRepository.find({ where: { createdDate: Between(new Date(today.setHours(0, 0, 0, 0)), new Date(today.setHours(23, 59, 59, 0))) } });
  }

  async findAll(start: Date, end: Date): Promise<DataEntity[]> {
    return this.dataRepository.find({ where: { createdDate: Between(start, end) } });
  }

}
