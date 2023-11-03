import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from './entities/device.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(@InjectRepository(DeviceEntity) private readonly deviceRepository: Repository<DeviceEntity>) { }
  
  async create(createDeviceDto: CreateDeviceDto): Promise<DeviceEntity | UpdateResult> {
    const device = await this.deviceRepository.findOne({ where: { uuid: createDeviceDto.uuid } });
    if (device) {
      return this.deviceRepository.update({ id: device.id }, { macId: createDeviceDto.macId, localIp: createDeviceDto.localIp });
    }
    return this.deviceRepository.save(createDeviceDto);
  }

  async findOne(uuid: string): Promise<DeviceEntity> {
    return this.deviceRepository.findOne({ where: { uuid } });
  }
}
