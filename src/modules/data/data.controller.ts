import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DataService } from './data.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDataDto } from './dto/create-data.dto';
import { DataEntity } from './entities/data.entity';

@ApiTags('Data')
@ApiResponse({ status: 401, description: 'Kullanıcının oturumu yok ise dönecektir' })
@ApiResponse({ status: 500, description: 'Sunucu Problemi' })
@Controller()
@Controller({ path: 'data', version: '1' })
export class DataController {
  constructor(private readonly dataService: DataService) { }
  
  @ApiOperation({ summary: 'Yeni Data' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Post()
  async create(@Body() createDataDto: CreateDataDto): Promise<DataEntity> {
    return this.dataService.create(createDataDto);
  }

  @ApiOperation({ summary: 'Bugüne ait tüm datayı getirir' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Get()
  async find(): Promise<DataEntity> {
    return this.dataService.findOne();
  }

  @ApiOperation({ summary: 'Bugüne ait tüm datayı getirir' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Get('today')
  async findToday(): Promise<DataEntity[]> {
    return this.dataService.find();
  }

  @ApiOperation({ summary: '2 Tarih arası tüm datayı getirir' })
  @ApiResponse({ status: 200, description: 'Başarılı mesajı dönecektir' })
  @ApiResponse({ status: 400, description: 'Eksik veya hatalı bilgiler.' })
  @Get(':start/:end')
  async findAll(@Param('start') start: string, end: string): Promise<DataEntity[]> {
    return this.dataService.findAll(new Date(start), new Date(end));
  }
}
