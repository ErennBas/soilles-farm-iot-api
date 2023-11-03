import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { DataGateway } from './data.gateway';
import { DeviceService } from '../device/device.service';
import { EErrors } from '../../common/enums';

@Injectable()
export class DataService {
  
  @Inject(DeviceService)
  private readonly deviceService: DeviceService
    

  constructor(@InjectRepository(DataEntity) private dataRepository: Repository<DataEntity>, private readonly dataGateway: DataGateway) {}

  async create(createDataDto: CreateDataDto): Promise<DataEntity> {
    const device = await this.deviceService.findOne(createDataDto.uuid);
    if (!device) {
      throw new HttpException({ message: [EErrors.NO_DEVICE] }, HttpStatus.BAD_REQUEST);
    }    
    const data = await this.dataRepository.save({
      moisture: createDataDto.moisture,
      waterTemperature: createDataDto.waterTemperature,
      weatherTemperature: createDataDto.weatherTemperature,
      device: device
    });
    if (!data) {
      throw new HttpException({ message: 'Veri Eklenemedi' }, HttpStatus.BAD_REQUEST);
    }
    this.dataGateway.sendMessage(await this.dataRepository.findOne({ where: { id: data.id } }));
    return data;
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
