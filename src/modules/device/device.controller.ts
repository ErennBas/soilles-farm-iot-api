import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceEntity } from './entities/device.entity';
import { UpdateResult } from 'typeorm';

@ApiTags('Device')
@ApiResponse({ status: 401, description: 'Kullanıcının oturumu yok ise dönecektir' })
@ApiResponse({ status: 500, description: 'Sunucu Problemi' })
@Controller({ path: 'device', version: '1' })
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ summary: 'Yeni Data' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Post()
  async create(@Body() createDataDto: CreateDeviceDto): Promise<DeviceEntity | UpdateResult> {
    return this.deviceService.create(createDataDto);
  }

  @ApiOperation({ summary: 'Yeni Data' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<DeviceEntity> {
    return this.deviceService.findOne(uuid);
  }
}
